import logging

from pyrogram import types, filters

from ..setup.web import WEB_API_URL
from ..setup.http_client import http_client
from ..utils.constants import CALLBACK_ACCEPT
from ..setup.pyro_client import bot


logger = logging.getLogger(__name__)

EVENT = 1
EVENT_ID = 2
USER_ID = 3


@bot.on_callback_query(filters.regex(CALLBACK_ACCEPT))
async def accept(_, query: types.CallbackQuery) -> None:
    match = CALLBACK_ACCEPT.match(query.data)
    if match:
        event_or_plan = match.group(EVENT)
        event_or_plan_id = match.group(EVENT_ID)
        user_id = match.group(USER_ID)
        await query.answer(f'Вы приняли уведомление {event_or_plan} {event_or_plan_id}!')
        try:
            json_content = {
                "id": event_or_plan_id,
                "eventOrPlan": event_or_plan,
                "user_id": user_id,
            }
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
    else:
        await query.answer()


