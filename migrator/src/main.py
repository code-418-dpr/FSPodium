import os
import asyncio
import logging
from pathlib import Path
from datetime import datetime

import asyncpg
import aiofiles
from dotenv import load_dotenv

from .pdf_getter import get_pdf_file
from .pdf_parser import parse_pdf_file
import contextlib



DB_CONFIG = {
    'user': os.getenv('POSTGRES_USER'),
    'password': os.getenv('POSTGRES_PASSWORD'),
    'database': os.getenv('POSTGRES_DB'),
    'host': 'postgres',
    'port': 5432
}

logger = logging.getLogger(__name__)
logging.basicConfig(
    encoding='utf-8',
    level=logging.INFO,
    filemode='w',
    format='%(name)s %(asctime)s %(levelname)s %(message)s',
)

DB_CONFIG = {
    'user': os.getenv('POSTGRES_USER'),
    'password': os.getenv('POSTGRES_PASSWORD'),
    'database': os.getenv('POSTGRES_DB'),
    'host': os.getenv('POSTGRES_HOST'),
    'port': os.getenv(key='POSTGRES_PORT')
}


async def run_static_migrations() -> None:
    conn = await asyncpg.connect(**DB_CONFIG)
    try:
        async with aiofiles.open('./data/migrations.sql', encoding='utf-8') as f:
            queries = await f.read()
        with contextlib.suppress(asyncpg.exceptions.UniqueViolationError):
            await conn.execute(queries)
    finally:
        await conn.close()


async def run_dynamic_migrations(local_pdf_only: bool = False) -> bool:
    conn = await asyncpg.connect(**DB_CONFIG)

    pdf_file_path = await get_pdf_file(local_pdf_only)
    if not pdf_file_path:
        return False

    try:
        for chunk in parse_pdf_file(pdf_file_path, keyword_to_parse='программир'):
            for item in chunk:
                if 'программир' not in item['sport'].lower():
                    break
                id = item['id']
                full_title = item['title']
                title, _, federal_district = full_title.rpartition(' (')
                if not title:
                    title, federal_district = federal_district, title
                federal_district = federal_district.removesuffix(')')
                disciplines = item['categories']
                age_range = item['participants']
                level = 'FEDREAL_DISTRICT' if federal_district else 'ALL_RUSSIA'
                start = datetime.strptime(item['start'], "%d.%m.%Y")
                end = datetime.strptime(item['end'], "%d.%m.%Y")
                participants_count = int(item['participants_count'])
                insert_query = """
                INSERT INTO "Event" (id, level, title, "ageRange", start, "end", "isOnline", "participantsCount", status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                """
                is_online = True
                with contextlib.suppress(Exception):
                    await conn.execute(insert_query, str(id), level, full_title, age_range, start, end, is_online, participants_count, 'APPROVED')
                for discipline in disciplines:
                    discipline = discipline.capitalize()
                    query = """SELECT id FROM "Discipline" WHERE name = $1;"""
                    result = (await conn.fetchrow(query, discipline))['id']
                    insert_query = """
                    INSERT INTO "DisciplinesOfEvents" ("disciplineId", "eventId")
                    VALUES ($1, $2)
                    """
                    with contextlib.suppress(asyncpg.exceptions.UniqueViolationError):
                        await conn.execute(insert_query, result, str(id))
    finally:
        await conn.close()
    return True

async def main() -> None:
    await run_static_migrations()
    await run_dynamic_migrations()

if __name__ == '__main__':
    asyncio.run(main())
