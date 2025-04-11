import logging

from pyrogram import types as tg_types
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import Body, status

from ..setup.pyro_client import bot
from ..setup.web import bot_backend
from ..setup.sqlite_orm import User, db_session


logger = logging.getLogger(__name__)


class AdminSupportData(BaseModel):
    user_id: int
    req_msg_id: str
    req_text: str


@bot_backend.post('/admin-support/')
async def admin_support_route(
        data: AdminSupportData = Body(...)
) -> JSONResponse:
    with db_session:
        user: User | None = User.get(id=data.user_id)
        if not user or user.role != 'CENTRAL_REP':
            return JSONResponse(
                {'message': 'Ошибка администратора'}, 
                status.HTTP_400_BAD_REQUEST
            )

    await bot.send_message(
        user.id, 
        data.message, 
        reply_markup=tg_types.InlineKeyboardMarkup([[
            tg_types.InlineKeyboardButton(
                '✅ Принять', 
                callback_data=f'support+{data.support_msg_id}'
            ),
            tg_types.InlineKeyboardButton(
                '❌ Отклонить',
                callback_data=f'support-{data.support_msg_id}'
            )
        ]])
    )

    return JSONResponse(
        {'message': 'Уведомления отправлены в центр'}, 
        status.HTTP_200_OK
    )
