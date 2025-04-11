import logging

from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import status, Body

from ..setup.pyro_client import bot
from ..setup.web import bot_backend
from ..setup.sqlite_orm import User, db_session


logger = logging.getLogger(__name__)


class NotificationData(BaseModel):
    user_ids: list[int]
    message: str


@bot_backend.post('/notifications/')
async def common_notifications_route(
        data: NotificationData = Body(...)
) -> JSONResponse:
    with db_session:
        users: list[User] = []
        for user_id in data.user_ids:
            user: User | None = User.get(id=user_id)
            if user and user.role:
                users.append(user)
            else:
                logging.warning(
                    'Пользователь с id %s не найден или не авторизован', user_id
                )

    for user in users:
        await bot.send_message(
            user.id, 
            data.message,
        )

    return JSONResponse(
        {'message': 'Уведомления разосланы'}, 
        status.HTTP_200_OK
    )
