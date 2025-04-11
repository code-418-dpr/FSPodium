from pyrogram import types, enums, filters

from ..setup.web import PUBLIC_WEB_URL
from ..setup.pyro_client import bot
from ..setup.sqlite_orm import db_session, User


@bot.on_message(
        filters.private 
        & filters.command('help')
)
async def help_msg_handler(_, msg: types.Message) -> None:
    with db_session:
        user: User | None = User.get(id=msg.from_user.id)
    if not user or not user.role:
        msg_text = (
            'FSPodium Бот позволяет использовать функционал веб-приложения'
            ' FSPodium, не выходя из мессенджера! Авторизуйтесь в профиле сервиса,'
            ' перейдя по ссылке из стартового сообщения, чтобы иметь возможность'
            '  воспользоваться функционалом бота. 👆🏻'
        )
    elif user.role == 'CENTRAL_REP':
        msg_text = (
            'FSPodium Бот позволяет использовать функционал веб-приложения'
            ' FSPodium, не выходя из мессенджера! Вы можете:'
            '\n- получать уведомления о входящих заявках и обращениях в'
            ' реальном времени;'
            '\n- принимать и отклонять заявки и обращения;'
            '\n- и многое другое, что пока находится в разработке для'
            ' вашего удобства. ❤️'
        )
    else:
        msg_text = (
            'FSPodium Бот позволяет использовать функционал веб-приложения'
            ' FSPodium, не выходя из мессенджера! Вы можете:'
            '\n- получать уведомления;'
            '\n- отслеживать статус своих заявок и обращений в реальном времени;'
            '\n- обращаться в поддержку (команда /support);'
            '\n- получать данные о своём представительстве (команда /info);'
            '\n- и многое другое, что пока находится в разработке для вашего'
            ' удобства. ❤️'
        )
    await msg.reply(
        msg_text,
        parse_mode=enums.ParseMode.MARKDOWN,
        reply_markup=types.InlineKeyboardMarkup([[
            types.InlineKeyboardButton('🔗 Открыть веб-приложение', url=PUBLIC_WEB_URL)
        ]])
    )

