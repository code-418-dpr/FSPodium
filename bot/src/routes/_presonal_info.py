import logging

from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
from fastapi import Body, status
from pyrogram import enums as tg_enums
from pyrogram import types as tg_types

from ..setup.pyro_client import bot
from ..setup.web import bot_backend, PUBLIC_WEB_URL
from ..setup.sqlite_orm import User, UserRole, db_session


logger = logging.getLogger(__name__)


class GetInfoData(BaseModel):
    user_id: int
    name: str
    email: EmailStr
    role: UserRole
    federal_district: str | None
    region: str | None


@bot_backend.post('/personal-info/')
async def info_notification_route(data: GetInfoData = Body(...)) -> JSONResponse:
    with db_session:
        user: User | None = User.get(id=data.user_id)
    if not user or not user.role or user.role != 'REGIONAL_REP':
        logging.warning('Некорректные данные пользователя с %s', data.user_id)
        return JSONResponse(
            {'message': 'Пользователь не найден в базе или не авторизован'}, 
            400
        )

    personal_info = (
        '**ПУБЛИЧНЫЕ ДАННЫЕ ВАШЕГО ПРЕДСТАВИТЕЛЬСТВА**'
        f'\n**ФИО:** {data.name}'
        f'\n**Почта:** {data.email}'
    )
    if data.federal_district:
        personal_info += f'\n**Федеральный округ:** {data.federal_district}'
    if data.region:
        personal_info += f'\n**Регион:** {data.region}'

    await bot.send_message(
        user.id, 
        personal_info,
        parse_mode=tg_enums.ParseMode.MARKDOWN,
        reply_markup=tg_types.InlineKeyboardMarkup([[
            tg_types.InlineKeyboardButton(
                '📝 Отредактировать на сайте', 
                url=f'{PUBLIC_WEB_URL}/regional'
            )
        ]])
    )
    return JSONResponse(
        {'message': f'Пользователь {user.id} получил данные о своём профиле'}, 
        status.HTTP_200_OK
    )
