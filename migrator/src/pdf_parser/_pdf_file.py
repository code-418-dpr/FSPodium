import logging
import re
from pathlib import Path
import typing

import pymupdf

from . import _pdf_page_text


FIRST_PAGE_REGEX = re.compile(r'^(.+\n)*\(чел\.\)')

logger = logging.getLogger(__name__)


def parse(
    pdf_path: Path,
    page_nums: tuple[int] | None = None,
    keyword_to_parse: str | None = None
) -> typing.Generator[list[dict], None, None]:
    logger.info(
        'Извлекаем текст из %s страниц файла %s',
        page_nums if page_nums else 'всех',
        pdf_path,
    )
    doc = pymupdf.open(pdf_path)

    logger.info('Парсим сырой текст страниц')
    for page_num in (page_nums if page_nums else range(doc.page_count)):
        page_text: str = doc[page_num].get_text()
        if page_num == 0:
            page_text = FIRST_PAGE_REGEX.sub('', page_text, count=1)
        if not keyword_to_parse \
                or keyword_to_parse and keyword_to_parse in page_text.lower():
            yield _pdf_page_text.parse(page_text)

    logger.info('Парсинг файла завершён')
