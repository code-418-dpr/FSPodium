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


class EventAdminNotificationsData(BaseModel):
    admin_id: int
    req_id: str
    federal_district: str | None
    region: str | None
    level: str
    age_range: str
    days: str
    is_online: bool
    address: str | None
    participants_count: int


@bot_backend.post('/event-admin-notifications/')
async def rep_admin_notifications_route(
        data: EventAdminNotificationsData = Body(...)
) -> JSONResponse:
    with db_session:
        user: User | None = User.get(id=data.admin_id)
        if user and user.role:
            federal_district = (
                f'\n**Федеральный округ:** {data.federal_district}' 
                if data.federal_district
                else ''
            )
            region = (
                f'\n**Регион:** {data.region}' 
                if data.region
                else ''
            )
            address = (
                f'\n**Адрес:** {data.address}' 
                if data.address
                else ''
            )
            match data.level:
                case 'REGION':
                    level = 'региональный'
                case 'FEDREAL_DISTRICT':
                    level = 'окружной'
                case 'ALL_RUSSIA':
                    level = 'всероссийский'
                case _:
                    raise NotImplementedError
            await bot.send_message(
                user.id, 
                '**НОВАЯ ЗАЯВКА НА СОЗДАНИЕ СОБЫТИЯ**'
                + federal_district
                + region
                + f'\n**Уровень:** {level}'
                f'\n**Возраст участников:** {data.age_range}'
                f'\n**Дни проведения**: {data.days}'
                f'\n**Формат проведения**: {'онлайн' if data.is_online else 'офлайн'}'
                + address
                + f'\n**Число участников**: {data.participants_count}',
                parse_mode=tg_enums.ParseMode.MARKDOWN,
                reply_markup=tg_types.InlineKeyboardMarkup([[
                    tg_types.InlineKeyboardButton('✔️ Принять', f'event+{data.req_id}'),
                    tg_types.InlineKeyboardButton('❌ Отклонить', f'event-{data.req_id}'),
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
