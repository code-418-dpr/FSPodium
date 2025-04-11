import logging

from pyrogram import types, filters, errors, enums
from httpx import RequestError

from .. import filters as my_filters
from ..setup.web import WEB_URL, http_client
from ..setup.pyro_client import bot
from ..setup.sqlite_orm import fsm


logger = logging.getLogger(__name__)


@bot.on_message(
        filters.private 
        & filters.command('support') 
        & ~my_filters.admin
)
async def support_msg_handler(_, msg: types.Message) -> None:
    await msg.reply(
        'Подробно опишите вашу проблему.'
        ' Мы постараемся ответить в ближайшее время. 👨🏻‍💻',
        reply_markup=types.InlineKeyboardMarkup([[
            types.InlineKeyboardButton('❌ Отменить обращение', 'cancel')
        ]])
    )

    fsm[msg] = 'wait_for_descroption'


@bot.on_message(
        filters.private
        & filters.text
        & ~my_filters.admin
        & fsm.at('wait_for_descroption')
)
async def handle_description(_, msg: types.Message) -> None:
    await msg.reply_chat_action(enums.ChatAction.TYPING)
    try:
        request = await http_client.post(
            f'{WEB_URL}/api/support/create', 
            json={'tgId': msg.from_user.id, 'request': msg.text}
        )
        if request.status_code not in (200, 201):
            err_msg = f'HTTP status {request.status_code}'
            raise RequestError(err_msg)
    except:
        await msg.reply(
            '😭 Произошла ошибка при отправке запроса. '
            'Попробуйте повторить обращение позднее или обратитесь в поддержку'
            'напрямую:\n**Email:** support@federation.ru\n'
            '**Телефон:** +7 (999) 123-45-67\n'
            '**Время работы:** Пн — Пт, 9:00 — 18:00',
            parse_mode=enums.ParseMode.MARKDOWN
        )
        logger.exception('Исключение при отправке запроса')
    else:
        await msg.reply('✅ Ваш запрос успешно отправлен. Ожидайте ответа.')
    finally:
        del fsm[msg]


@bot.on_callback_query(
        filters.regex('cancel') 
        & ~my_filters.admin
        & fsm.at('wait_for_descroption')
)
async def handle_cancel(_, query: types.CallbackQuery) -> None:
    await query.answer()
    bot_msg_text = '❎ Вы отменили обращение в поддержку.'
    try:
        await query.message.edit(bot_msg_text)
    except (
        errors.MessageEditTimeExpired, 
        errors.ChatIdInvalid, 
        errors.MessageIdInvalid,
        errors.MessageNotModified,
    ) as e:
        if e != errors.ChatIdInvalid:
            await query.message.reply(bot_msg_text)

    del fsm[query]
