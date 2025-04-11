import re
import logging
from contextlib import suppress

from pyrogram import types, filters, errors, enums

from .. import filters as my_filters
from ..setup.web import WEB_URL, http_client, status_codes
from ..setup.pyro_client import bot
from ..setup.sqlite_orm import fsm, State


ADMIN_EVENT_REGEX = re.compile(r'^event([\+\-])(.+)$')

logger = logging.getLogger(__name__)


@bot.on_callback_query(
        filters.regex(ADMIN_EVENT_REGEX) 
        & my_filters.admin
)
async def handle_keyboard(_, query: types.CallbackQuery) -> None:
    approve_or_refuse, req_id = ADMIN_EVENT_REGEX.match(str(query.data)).groups()
    if approve_or_refuse == '+':
        res = await http_client.post(
            f'{WEB_URL}/api/request', 
            json={'requestId': req_id, 'type': 'event', 'refusalReason': None}
        )
        if res.status_code == status_codes.HTTP_200_OK:
            try:
                await query.message.edit(
                    f'{query.message.text}\n\n✅ Заявка принята.', 
                    parse_mode=enums.ParseMode.MARKDOWN
                )
            except (
                errors.MessageEditTimeExpired, 
                errors.ChatIdInvalid, 
                errors.MessageIdInvalid,
            ) as e:
                if not isinstance(e, errors.ChatIdInvalid):
                    await query.message.reply(
                        '✅ Заявка принята.', 
                        reply_to_message_id=(
                            query.message.id 
                            if not isinstance(e, errors.MessageIdInvalid) 
                            else None
                        )
                    )
            finally:
                await query.answer('✅ Заявка принята.')
        else:
            await query.answer(
                'Не удалось подтвердить заявку. 😭'
                ' Пожалуйста, повторите попытку позднее',
                show_alert=True,
                cache_time=300
            )
    else:
        await query.answer()
        await query.message.reply('Опишите причину отклонения заявки:')
        fsm[query] = State('wait_for_reason_event', f'{req_id}|{query.message.id}')


@bot.on_message(
        filters.text
        & my_filters.admin
        & fsm.at('wait_for_reason_event')
)
async def handle_cancel(_, msg: types.Message) -> None:
    req_id, query_msg_id = fsm[msg].data.split('|')
    query_msg: types.Message = await bot.get_messages(msg.from_user.id, int(query_msg_id))
    res = await http_client.post(
        f'{WEB_URL}/api/request', 
        json={
            'requestId': req_id, 
            'type': 'event', 
            'refusalReason': msg.text
        }
    )
    if res.status_code == status_codes.HTTP_200_OK:
        with suppress(
            errors.MessageEditTimeExpired, 
            errors.ChatIdInvalid, 
            errors.MessageIdInvalid,
        ):
            await query_msg.edit(
                f'{query_msg.text}\n\n❎ Заявка отклонена.', 
                parse_mode=enums.ParseMode.MARKDOWN
            )
        await query_msg.reply('❎ Заявка отклонена.')
    else:
        await query_msg.reply(
            'Не удалось отклонить заявку. 😭'
            ' Пожалуйста, повторите попытку позднее.'
        )

    del fsm[msg]
