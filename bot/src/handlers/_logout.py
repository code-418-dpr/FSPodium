import logging

from pyrogram import types, filters, errors

from .. import filters as my_filters
from ..setup.web import WEB_URL, status_codes, http_client
from ..setup.sqlite_orm import fsm, db_session, User
from ..setup.pyro_client import bot


logger = logging.getLogger(__name__)


@bot.on_message(
        filters.private 
        & filters.command('logout') 
        & my_filters.authorized
)
async def support_msg_handler(_, msg: types.Message) -> None:
    await msg.reply(
        'Вы точно хотите выйти из аккаунта? Чтобы воспользоваться ботом,'
        ' нужно будет авторизоваться повторно.',
        reply_markup=types.InlineKeyboardMarkup([[
            types.InlineKeyboardButton('✔️ Да, выйти', 'approve'),
            types.InlineKeyboardButton('❌ Отмена', 'cancel')
        ]])
    )

    fsm[msg] = 'approve'


@bot.on_callback_query(
        my_filters.authorized
        & fsm.at('approve')
)
async def handle_cancel(_, query: types.CallbackQuery) -> None:
    await query.answer()
    user: User | None = None
    if query.data == 'cancel':
        bot_msg_text = '❎ Вы отменили выход из аккаунта.'
    else:
        with db_session:
            user = User.get(id=query.from_user.id)
            if user:
                res = await http_client.post(
                    f'{WEB_URL}/api/tg-logout', 
                    json={'tgId': user.id}
                )
                if res.status_code == status_codes.HTTP_200_OK:
                    user.role = ''
                    bot_msg_text = '✅ Вы вышли из аккаунта.'
        if not user:
            bot_msg_text = (
                'Не удалось выйти из аккаунта. 😭'
                ' Пожалуйста, повторите попытку позднее или обратитесь в'
                ' поддержку (/support).'
            )
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
