import os
import logging
from pathlib import Path

import pyrogram


logger = logging.getLogger(__name__)


# if sys.platform != 'win32':
#     import uvloop
#     uvloop.install()
#     logger.info('uvloop подключён')
# else:
#     logger.info('asyncio подключён')

API_ID = os.getenv('API_ID')
API_HASH = os.getenv('API_HASH')
TEST_MODE_ENABLED = bool(os.getenv('TEST_MODE_ENABLED'))
if TEST_MODE_ENABLED:
    SESSION_NAME = 'TestBot'
    BOT_TOKEN = os.getenv('TEST_TOKEN')
    logger.info('Тестовый режим активирован')
else:
    SESSION_NAME = 'Bot'
    BOT_TOKEN = os.getenv('TOKEN')
    logger.info('Релизный режим активирован')
SESSION_PATH = Path('session').absolute()
SESSION_PATH.mkdir(parents=True, exist_ok=True)

if not (API_ID or API_HASH or BOT_TOKEN):
    err_msg = (
        'Одна из переменных окружения не определена:\n'
        f'{API_ID = }\n{API_HASH = }\n{BOT_TOKEN = }'
    )
    raise OSError(err_msg)

bot = pyrogram.client.Client(
    str(SESSION_PATH / SESSION_NAME),
    API_ID,
    API_HASH,
    lang_code='ru',
    bot_token=BOT_TOKEN,
    test_mode=TEST_MODE_ENABLED,
)
logger.info('Экземпляр бота успешно создан: %s', SESSION_NAME)
