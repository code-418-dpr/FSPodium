import os
import logging
from pathlib import Path

import httpx
from dotenv import load_dotenv

from .pdf_getter import get_pdf_file
from .pdf_parser import parse_pdf_file

load_dotenv()
PDF_FILE_URL = os.getenv('PDF_FILE_URL')
BACKEND_DATA_ROUTE_URL = os.getenv('BACKEND_DATA_ROUTE_URL')
PREV_URL_PATH = Path('tmp/prev_url.txt')
PDF_FILE_PATH = Path('tmp/table.pdf')

logger = logging.getLogger(__name__)
logging.getLogger('httpx').setLevel(logging.WARNING)


async def process(local_pdf_only: bool = False) -> bool:
    pdf_file_path = await get_pdf_file(local_pdf_only)
    if not pdf_file_path:
        return False

    async with httpx.AsyncClient() as client:
        for num, chunk in enumerate(parse_pdf_file(pdf_file_path)):
            response = await client.post(
                BACKEND_DATA_ROUTE_URL,
                json=chunk,
                timeout=60,
            )
            if num % 100 == 0:
                logger.info('Обработано %s страниц', num)
            if response.status_code not in (200, 201):
                logger.error(
                    'Ошибка %s при отправке данных на сервер: %s',
                    response.status_code,
                    response.json(),
                )
                return False
    return True
