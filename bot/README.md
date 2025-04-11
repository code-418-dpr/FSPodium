# FSPodium Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python versions](https://img.shields.io/badge/python-^3.12-blue)](https://python.org/)
[![Poetry](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)](https://python-poetry.org/)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)

Telegram-бот для проекта FSPodium

## Особенности разработки
- [x] работает на собственном протоколе Telegram MTProto
- [x] не требует настройки вебхуков для работы
- [x] все инструменты отличаются высокой скоростью в бенчмарках
- [x] интерактивный интерфейс, основанный на инлайн-клавиатурах
- [x] вход в учётную запись через веб-приложение
- [x] один из способов получения уведомлений
- [x] канал связи между центром и регионами
- [x] получение справочной информации
- [ ] повторяет основные функции веб-приложения
- [ ] подтверждение и отклонение заявок у администратора
- [ ] интегрированный чат техпооддержки

## Стек
- **[Python](https://www.python.org/)** — язык программирования
- **[Poetry](https://python-poetry.org/)** — пакетный менеджер
- **[KurimuzonAkuma / pyrogram](https://pyrodocs.kurimuzon.lol/)** — фреймворк для работы с Telegram MTProto API
- **[uvloop](https://magic.io/blog/uvloop-blazing-fast-python-networking/)** — более быстрый цикл событий, чем стандартный asyncio
- **[TgCrypto](https://github.com/pyrogram/tgcrypto)** — библиотека криптографии для Telegram, более быстрая, чем стандартная
- **[SQLite](https://www.sqlite.org/) + [PonyORM](https://ponyorm.org/)** — локальная БД для хранения состояний и ORM для неё
- **[FastAPI](https://fastapi.tiangolo.com/)** — высокопроизводительный веб-фреймворк для создания API
- **[HTTPX](https://www.python-httpx.org/)** — асинхронный HTTP-клиент
- **[Uvicorn](https://www.uvicorn.org/)** — высокопроизводительный ASGI сервер
- **[Ruff](https://astral.sh/ruff)** — инструмент для форматирования и анализа кода

## Установка и запуск
0. Клонируйте репозиторий, перейдите в его папку и создайте в ней файл `.env` на основе `.env.template`.

### Посредством Docker
1. Установите и настройте [Docker](https://www.docker.com/).
2. Из папки проекта выполните сборку образа:
```shell
docker build -t fspodium-bot .
```
3. Теперь запускать бота можно командой:
```shell
docker run -it -d -p 8000:8000 fspodium-bot
```

### Без использования Docker
1. Установите [Poetry](https://python-poetry.org/).
2. Из папки проекта выполните установку зависимостей:
```shell
poetry install
```
3. Теперь запускать бота можно командой:
```shell
poetry run python -m src.main
```
