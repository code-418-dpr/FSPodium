import random

from pyrogram import types, filters

from ..setup.pyro_client import bot
from ..filters import authorized


@bot.on_message(filters.private)
async def unknown_msg_handler(_, msg: types.Message) -> None:
    if await authorized(_, msg):
        emoji = random.choice(('⁉️', '🤨', '🤔', '🤷🏻‍♂️'))
        await msg.reply(emoji)
    else:
        await msg.reply('⚠️ Чтобы воспользоваться ботом, необходимо авторизоваться.')


@bot.on_callback_query()
async def unknown_callback_handler(_, query: types.CallbackQuery) -> None:
    await query.answer()
