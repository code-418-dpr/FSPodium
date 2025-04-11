import logging

from pyrogram import types, filters

from ..setup.web import PUBLIC_WEB_URL
from ..setup.pyro_client import bot
from ..setup.sqlite_orm import User, db_session
from ..utils.token import ids_to_token


logger = logging.getLogger(__name__)


@bot.on_message(filters.private & filters.command('start'))
async def start_msg_handler(_, msg: types.Message) -> None:
    user_id = msg.from_user.id
    with db_session:
        user: User | None = User.get(id=user_id)
        if not user:
            user = User(id=user_id)
        if user.role:
            await msg.reply('🔓 Вы уже авторизованы.')
            return

    new_msg = await msg.reply(
        'Для авторизации перейдите на страницу проекта. 👇🏻',
    )
    token = ids_to_token(msg.from_user.id, new_msg.id)
    url = f'{PUBLIC_WEB_URL}/tg-auth/{token}'

    await new_msg.edit_reply_markup(types.InlineKeyboardMarkup(
        [[types.InlineKeyboardButton('🔐 Авторизация', url=url)]]
    ))

    logger.debug('%s', new_msg.id)
