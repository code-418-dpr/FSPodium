import logging
from contextlib import suppress

from pyrogram import errors as tg_errors
from pyrogram import types as tg_types
from pydantic import BaseModel
from fastapi.responses import JSONResponse

from ..setup.pyro_client import bot
from ..setup.web import bot_backend, status_codes
from ..setup.sqlite_orm import User, UserRole, db_session


logger = logging.getLogger(__name__)


class AuthData(BaseModel):
    id: int
    msg_id: int
    role: UserRole


@bot_backend.post('/auth/')
async def auth_route(data: AuthData) -> JSONResponse:
    with db_session:
        user: User | None = User.get(id=data.id)
        if not user:
            logger.error('Пользователь не найден в базе: %s', data.id)
            bot_msg_text = '🔒 Ошибка авторизации.'
            resp = JSONResponse(
                {'message': 'Пользователь с таким ID не найден'}, 
                status_codes.HTTP_400_BAD_REQUEST
            )
        elif user.role:
            logger.warning('Пользователь уже авторизован: %s', data.id)
            bot_msg_text = '🔓 Вы уже авторизованы.'
            resp = JSONResponse(
                {'message': 'Пользователь с таким ID уже авторизован'}
            )
        else:
            user.role = data.role
            logger.info('Пользователь успешно авторизован')
            bot_msg_text = '🔓 Авторизация прошла успешно!'
            resp = JSONResponse({'message': 'Авторизация прошла успешно'})
    with suppress(tg_errors.MessageIdInvalid):
        await bot.delete_messages(data.id, data.msg_id)
    await bot.send_message(data.id, bot_msg_text)
    return resp
