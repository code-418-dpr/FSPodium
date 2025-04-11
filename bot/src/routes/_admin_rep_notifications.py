import logging

from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
from fastapi import status, Body
from pyrogram import enums as tg_enums
from pyrogram import types as tg_types

from ..setup.pyro_client import bot
from ..setup.web import bot_backend
from ..setup.sqlite_orm import User, db_session


logger = logging.getLogger(__name__)


class RepAdminNotificationsData(BaseModel):
    admin_id: int
    req_id: str
    federal_district: str
    region: str
    name: str
    email: EmailStr


@bot_backend.post('/rep-admin-notifications/')
async def rep_admin_notifications_route(
        data: RepAdminNotificationsData = Body(...)
) -> JSONResponse:
    with db_session:
        user: User | None = User.get(id=data.admin_id)
        if user and user.role:
            await bot.send_message(
                user.id, 
                '**НОВАЯ ЗАЯВКА НА СОЗДАНИЕ ПРЕДСТАВИТЕЛЬСТВА**'
                f'\n**Федеральный округ:** {data.federal_district}'
                f'\n**Регион:** {data.region}'
                f'\n**ФИО представителя:** {data.name}'
                f'\n**E-mail:** {data.email}',
                parse_mode=tg_enums.ParseMode.MARKDOWN,
                reply_markup=tg_types.InlineKeyboardMarkup([[
                    tg_types.InlineKeyboardButton('✔️ Принять', f'rep+{data.req_id}'),
                    tg_types.InlineKeyboardButton('❌ Отклонить', f'rep-{data.req_id}'),
                ]])
            )
        else:
            logging.warning(
                'Админ с id %s не найден или не авторизован', data.admin_id
            )

    return JSONResponse(
        {'message': 'Уведомления разосланы'}, 
        status.HTTP_200_OK
    )
