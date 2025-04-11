# FSPodium Migrator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python versions](https://img.shields.io/badge/python-^3.12-blue)](https://python.org/)
[![Poetry](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)](https://python-poetry.org/)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)

Временный инициализатор базы данных до момента для проекта FSPoduim

## Особенности разработки
- [x] вызывается единожды при инициализации БД для заполнения её реальными данными
- [x] парсит соревнования 2024 года из последней версии ЕКП
- [x] поддерживает изменение ссылки на файл ЕКП в будущем
- [x] максимально точно распознаёт содержание PDF-файла
- [ ] дополняет события из ЕКП региональными соревнованиями из новостей с сайта ФСП
- [ ] в будущих версиях (после бесшовного перехода на FSPodium всех пользователей) подлежит упразднению за ненадобностью

## Стек:
- **[Python](https://www.python.org/)** — язык программирования
- **[Poetry](https://python-poetry.org/)** — пакетный менеджер
- **[PyMuPDF](https://pymupdf.readthedocs.io/en/latest/)** — высокопроизводительный парсер PDF
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
docker build -t fspodium-migrator .
```
3. Теперь запускать мигратор можно командой:
```shell
docker run -it -d -p 8000:8000 fspodium-migrator
```

### Без использования Docker
1. Установите [Poetry](https://python-poetry.org/).
2. Из папки проекта выполните установку зависимостей:
```shell
poetry install
```
3. Теперь запускать мигратор можно командой:
```shell
poetry run python -m src.main
```
