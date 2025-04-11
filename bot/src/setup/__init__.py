import os
import logging

from dotenv import load_dotenv


load_dotenv_status = load_dotenv()

LOGLEVEL = os.getenv('LOGLEVEL') or '30'
if not LOGLEVEL or not LOGLEVEL.isdigit():
    msg = f'Некорректное значение переменной\n{LOGLEVEL = }'
    raise OSError(msg)

logging.basicConfig(
    filemode='w',
    encoding='utf-8',
    level=int(LOGLEVEL),
    datefmt='%Y.%m.%d %H:%M:%S',
    format='%(name)s %(asctime)s.%(msecs)03d %(levelname)s %(message)s',
)

logger = logging.getLogger(__name__)
logger.info(
    'Переменные окружения подгружены из .env' if load_dotenv_status 
    else 'Переменные окружения НЕ подгружены: .env не найден или содержит ошибку'
)
