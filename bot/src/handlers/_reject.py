import logging

from pyrogram import types, filters

from ..setup.sqlite_orm import db_session, RejectContext
from ..utils.constants import CALLBACK_REJECT
from ..setup.web import WEB_TG_AUTH_URL, WEB_API_URL
from ..setup.pyro_client import bot
from ._states import state_machine, RejectionStates
from ..setup.http_client import http_client


logger = logging.getLogger(__name__)

EVENT = 1
EVENT_ID = 2

@bot.on_callback_query(filters.regex(CALLBACK_REJECT))
async def reject(_, query: types.CallbackQuery) -> None:
    await query.message.reply('Напишите причину отказа ')
    match = CALLBACK_REJECT.match(query.data)
    if match:
        event_or_plan = match.group(EVENT)
        event_or_plan_id = match.group(EVENT_ID)
        with db_session:
            reject_context: RejectContext | None = RejectContext.get(
                id=str(event_or_plan_id), user_id=str(query.from_user.id))
            if not reject_context:
                reject_context = RejectContext(
                    id=str(event_or_plan_id), event_or_plan=event_or_plan, user_id=str(query.from_user.id))
    state_machine[query.from_user.id] = RejectionStates.SEND_REJECT


#допилить когда будет готов бэк
@bot.on_message(filters.private & state_machine.at(RejectionStates.SEND_REJECT))
async def send_reason_of_reject(_, msg: types.Message) -> None:
    with db_session:
        reject_context: RejectContext = RejectContext.get(user_id=str(msg.from_user.id))
        if not reject_context:
            logger.error(f'Отказ с таким id {reject_context.id} не найден')

    #Есть проблемный момент
    json_content = {
        "id": reject_context.id,
        "event_or_plan": reject_context.event_or_plan,
        "user_id": reject_context.user_id,
    }

    try:
        response = await http_client.post(
            WEB_API_URL,
            json=json_content,
        )

        if response.status_code == 200:
            logger.info('Отправлен запрос с отказом успешно')
        else:
            logger.error(f'Ошибка при отправке запроса: {response.status_code} - {response.text}')

    except Exception as e:
        logger.error(f'Исключение при отправке запроса: {str(e)}')
