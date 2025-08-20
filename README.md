# FSPodium

[![license](https://img.shields.io/github/license/code-418-dpr/FSPodium)](https://opensource.org/licenses/MIT)
[![release](https://img.shields.io/github/v/release/code-418-dpr/FSPodium?include_prereleases)](https://github.com/code-418-dpr/FSPodium/releases)

Платформа для координации между офисом Федерации спортивного программирования ДНР и её структурными подразделениями

<details>
  <summary><h2>Демо</h2></summary>
   Здесь будут скриншоты работы проекта, возможно даже видео.
</details>

## Особенности реализации

-   веб-приложение:
    -   [x] авторизация пользователей с проверкой почты
    -   [x] поддержка ролей центрального и региональных представительств
    -   [x] возможность подачи заявки на регистрацию аккаунта представительства и добавление соревнований
    -   [x] просмотр и управление всеми типами заявок центром
    -   [x] одобренные центром события отображаются в удобном календаре
    -   [x] вывод аналитической информации
    -   [x] уведомления о новых заявках и обращениях, а также изменении их статуса
    -   [x] изменение публичной контактной информации
-   Telegram-бот:
    -   [x] вход в учётную запись через веб-приложение
    -   [x] один из способов получения уведомлений
    -   [x] канал связи между центром и регионами
    -   [x] получение публичных данных о представительстве
    -   [x] получение справочной информации
-   генератор данных:
    -   [x] позволяет генерировать синтетические данные, приближенные к реальным
    -   [x] позволяет парсить TXT и CSV датасеты
    -   [x] сохраняет сгенерированные данные в PostgreSQL
-   парсер отчётов:
    -   [x] позволяет распознавать результаты соревнований из файлов формата DOCX
    -   [x] полностью поддерживается формат отчётов ФСП ДНР

## Архитектура

Проект состоит из микросервисов, предназначенных для развёртывания в Docker:

- **[веб-приложение](https://github.com/code-418-dpr/FSPodium-web)**
- **[Telegram-бот](https://github.com/code-418-dpr/FSPodium-bot)**
- **[файловый сервис](https://github.com/code-418-dpr/FSPodium-file-service)**
- **[парсер отчётов](https://github.com/code-418-dpr/FSPodium-report-parser)**
- **PostgreSQL** — база данных
- **Traefik** — обратный прокси

## В планах
-   [ ] дополнительные варианты отображения контента
-   [ ] перенос основных возможностей веб-приложения в Telegram-бот
-   [ ] составление календарного плана и отчётов о соревнованиях в удобном интерфейсе
-   [ ] единый шаблон генерации выходных документов для всех регионов
-   [ ] упразднение парсера отчётов после обеспечения полного перехода всех представительств на FSPodium
-   [ ] расширение целевой аудитории платформы: тренеры, спортсмены, кейсодержатели
-   [ ] общий рейтинг спортсменов на платформе с историей соревнований и наградами

## Установка

> [!NOTE]
> Мы отказались от использования `git submodules` и `git subtree` из-за периодически возникающей путаницы при
> отслеживании изменений в монорепозиториях. Данный репозиторий представляет собой единую точку для работы с проектом,
> лишённую этих недостатков.

0. Клонируйте репозиторий и перейдите в его папку.
1. Клонируйте репозитории сервисов, входящих в состав проекта по SSH (рекомендуется):

```shell
git clone git@github.com:code-418-dpr/FSPodium-web.git services/FSPodium-web
git clone git@github.com:code-418-dpr/FSPodium-web.git services/FSPodium-bot
git clone git@github.com:code-418-dpr/FSPodium-web.git services/FSPodium-file-service
git clone git@github.com:code-418-dpr/FSPodium-web.git services/FSPodium-report-parser
```

или по HTTPS:

```shell
git clone https://github.com/code-418-dpr/FSPodium-web.git services/FSPodium-web
git clone https://github.com:code-418-dpr/FSPodium-web.git services/FSPodium-bot
git clone https://github.com:code-418-dpr/FSPodium-web.git services/FSPodium-file-service
git clone https://github.com:code-418-dpr/FSPodium-web.git services/FSPodium-report-parser
```

После этого вы можете вносить изменения в каждый из сервисов по-отдельности (в соответствии с инструкциями, описанными в
соответствующих README).

## Запуск и модификация

0. Установите проект по инструкции выше.
1. Создайте файл `.env` на основе [.env.template](.env.template) и настройте все описанные там параметры.
2. Установите Docker.
3. Теперь запускать проект можно командой:

```shell
docker compose --profile server up -d --build
```

При модификации сервисов проекта и их тестировании может потребоваться создание файлов `.env` для каждого из них. Однако, при запуске всех сервисов в одном контейнере (из этого репозитория) их не должно быть. Чтобы не удалять их, для запуска сервисов **на локальном устройстве** можно воспользоваться следующим набором команд:

```shell
mv ./services/FSPodium-web/.env ./services/FSPodium-web/_.env
mv ./services/FSPodium-bot/.env ./services/FSPodium-bot/_.env
mv ./services/FSPodium-file-service/.env ./services/FSPodium-file-service/_.env
mv ./services/FSPodium-report-parser/.env ./services/FSPodium-report-parser/_.env
docker compose --profile local up -d --build
mv ./services/FSPodium-web/_.env ./services/FSPodium-web/.env
mv ./services/FSPodium-bot/_.env ./services/FSPodium-bot/.env
mv ./services/FSPodium-file-service/_.env ./services/FSPodium-file-service/.env
mv ./services/FSPodium-report-parser/_.env ./services/FSPodium-report-parser/.env
```
