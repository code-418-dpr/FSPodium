import logging
from typing import Literal

from pony import orm

from .pyro_client import SESSION_PATH, SESSION_NAME
from pyrostates import StateMachine, State


logger = logging.getLogger(__name__)

DB_PATH = SESSION_PATH / f'{SESSION_NAME}.db'
db = orm.Database()
db_session = orm.db_session

UserRole = Literal['CENTRAL_REP', 'REGIONAL_REP']


class User(db.Entity):
    id = orm.PrimaryKey(int, size=64)
    role = orm.Optional(str)


class RejectContext(db.Entity):
    id = orm.Required(str)
    event_or_plan = orm.Required(str)
    user_id = orm.Required(str)
    orm.PrimaryKey(id, user_id)


db.bind(provider='sqlite', filename=str(DB_PATH), create_db=True)
db.generate_mapping(create_tables=True)
fsm = StateMachine(DB_PATH)

logger.info('БД с FSM успешно подключены: %s', DB_PATH)
