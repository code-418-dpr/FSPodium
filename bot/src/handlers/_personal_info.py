import logging

from pyrogram import types, enums, filters

from ..setup.web import WEB_URL, http_client
from ..setup.pyro_client import bot
from .. import filters as my_filters


logger = logging.getLogger(__name__)


@bot.on_message(
        filters.private 
        & filters.command('info') 
        & ~my_filters.admin
)
async def personal_info_handler(_, msg: types.Message) -> None:
    try:
        await msg.reply_chat_action(enums.ChatAction.TYPING)
        await http_client.get(
            f'{WEB_URL}/api/personal-info',
            params={'tgId': msg.from_user.id}
        )
    except:
        await msg.reply(
            'Не удалось запросить информацию о представительстве. 😭'
            ' Пожалуйста, повторите попытку позднее или обратитесь в'
            ' поддержку (/support).'
        )
        logger.exception(
            'Произошла ошибка при отправке запроса о персональной информации'
        )
