import os
import logging
from pathlib import Path

import httpx
import aiofiles
from dotenv import load_dotenv

from ._get_html_page import get_html_page
from ._parse_file_url import parse_file_url
from ._download_file import download_file


load_dotenv()
PDF_FILE_URL = os.getenv('PDF_FILE_URL')
BACKEND_DATA_ROUTE_URL = os.getenv('BACKEND_DATA_ROUTE_URL')
PREV_URL_PATH = Path('tmp/prev_url.txt')
PDF_FILE_PATH = Path('tmp/table.pdf')

logger = logging.getLogger(__name__)


async def get_pdf_file(local_only: bool = False) -> Path | None:
    logger.info(
        'Получаем PDF-файл и сведения о нём. Режим локального получения: %s',
        local_only,
    )
    result = None

    async with httpx.AsyncClient(verify=False) as client:
        if local_only:
            if PDF_FILE_PATH.exists():
                result = PDF_FILE_PATH
            else:
                logger.error('Файл не найден')
            return result

        page = await get_html_page(client, PDF_FILE_URL)
        if not page:
            return result

        file_url = parse_file_url(page)
        if not file_url:
            return result

        changed = False
        if PREV_URL_PATH.exists():
            async with aiofiles.open(PREV_URL_PATH, 'r+') as file:
                prev_url = await file.read()
                if prev_url != file_url:
                    await file.write(file_url)
                    changed = True
        else:
            Path('tmp').mkdir(exist_ok=True)
            async with aiofiles.open(PREV_URL_PATH, 'w') as file:
                await file.write(file_url)
                changed = True

        if not changed:
            logger.info('Файл не изменился')
            result = PDF_FILE_PATH
        else:
            logger.info('Файл изменился')
            is_file_downloaded = await download_file(client, PDF_FILE_PATH, file_url)
            if is_file_downloaded:
                logger.info('Файл скачан')
                result = PDF_FILE_PATH
        return result
