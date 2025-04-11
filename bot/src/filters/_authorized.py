from pyrogram import filters, types

from ..setup.sqlite_orm import User, db_session


async def func(_, __, msg_or_query: types.Message | types.CallbackQuery) -> bool:
    with db_session:
        user: User | None = User.get(id=msg_or_query.from_user.id)
    return user and user.role


authorized = filters.create(func)
