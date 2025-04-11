import re
import logging

from pyrogram import types, filters, errors

from .. import filters as my_filters
from ..setup.web import WEB_URL, http_client
from ..setup.pyro_client import bot
from ..setup.sqlite_orm import fsm


ADMIN_SUPPORT_REGEX = re.compile(r'^support([\+\-])(.+)$')

logger = logging.getLogger(__name__)


@bot.on_callback_query(
        filters.regex(ADMIN_SUPPORT_REGEX) 
        & my_filters.admin
)
async def handle_cancel(_, query: types.CallbackQuery) -> None:
    approve_or_refuse, support_message_id = ADMIN_SUPPORT_REGEX.match(str(query.data)).groups()
    if approve_or_refuse == '-':
        await http_client.post(
            f'{WEB_URL}/api/support/answer', 
            json={'supportMessageId': support_message_id, 'response': None}
        )

    await query.answer()
    bot_msg_text = '❎ Вы отменили обращение в поддержку.'
    try:
        await query.message.edit(bot_msg_text)
    except (
        errors.MessageEditTimeExpired, 
        errors.ChatIdInvalid, 
        errors.MessageIdInvalid,
    ) as e:
        if not isinstance(e, errors.ChatIdInvalid):
            await query.message.reply(bot_msg_text)

    del fsm[query]
