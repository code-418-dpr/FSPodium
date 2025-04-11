import os
import logging

import httpx
from fastapi import FastAPI
from fastapi import status as status_codes


logger = logging.getLogger(__name__)

BOT_BACKEND_PORT = os.getenv('BACKEND_PORT') or ''
WEB_URL = os.getenv('WEB_URL') or ''
PUBLIC_WEB_URL = os.getenv('PUBLIC_WEB_URL') or ''

if not (BOT_BACKEND_PORT or WEB_URL or PUBLIC_WEB_URL):
    err_msg = (
        'Одна из переменных окружения не определена:\n'
        f'{BOT_BACKEND_PORT = }\n{WEB_URL = }\n{PUBLIC_WEB_URL = }'
    )
    raise OSError(err_msg)
elif not BOT_BACKEND_PORT.isdigit():
    err_msg = (
        'Порт бэкенда должен быть числовым значением.'
        f' Получено: {BOT_BACKEND_PORT}'
    )
    raise ValueError(err_msg)

BOT_BACKEND_PORT = int(BOT_BACKEND_PORT)

bot_backend = FastAPI()
http_client = httpx.AsyncClient(follow_redirects=True, timeout=60)
logger.info('Экземпляры бэкенда и HTTP-клиента успешно созданы')
