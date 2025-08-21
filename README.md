# FSPodium

[![license](https://img.shields.io/github/license/code-418-dpr/FSPodium)](https://opensource.org/licenses/MIT)
[![release](https://img.shields.io/github/v/release/code-418-dpr/FSPodium?include_prereleases)](https://github.com/code-418-dpr/FSPodium/releases)

Платформа для координации между офисом Федерации спортивного программирования ДНР и её структурными подразделениями

<details>
  <summary><h2>Демо</h2></summary>
  <h3>Лендинг</h3>
  <img width="70%" src="https://github.com/user-attachments/assets/40e3d31f-1562-461c-8f19-207af52b6687" />
  <img width="70%" src="https://github.com/user-attachments/assets/5f741e2a-c969-49e8-b1bf-bbbcef4ad9d3" />
  <img width="70%" src="https://github.com/user-attachments/assets/30979753-d732-4083-8e61-d67ffc22ef91" />
  
  <h3>Публичный календарь соревнований</h3>
  <h4>Вид месяца</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/cce59280-dada-4531-b10f-563bd8da436f" />
  <h4>Вид недели</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/6a2a14c8-8603-434f-84de-57aa9f71ff02" />
  <h4>Фильтр подразделений</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/b77e9259-e781-460e-9333-424f8ae161ee" />
  <h4>Карточка события</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/db5d3540-3aef-4b00-a3b6-c33bec7e0a6e" />

  <h3>Интерфейс структурного подразделения</h3>
  <h4>Форма авторизации</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/9c22303a-96f4-45f8-9f1d-a00d77d24d37" />
  <h4>Форма заявки на создание подразделения</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/7a790d45-2025-4796-b47c-1b688950a84c" />
  <h4>Письмо со ссылкой после одобрения заявки</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/daa9823a-70e9-441f-a468-f48a9e1afb13" />

  <h4>Статистика у структурного подразделения</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/3f0723e5-cdc2-47dc-9279-ed2a2ec9a0f2" />
  <h4>Настройки уведомлений у подразделения</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/d5f23e06-2365-45f9-91a1-58e1a622f1a0" />
  <h4>Раздел справочной информации у подразделения</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/d4157a3c-14d3-4ca5-8c8b-8346afff64eb" />

  <h4>Форма подачи заявки на проведение мероприятия подразделением</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/f3366904-1c8d-4681-a2da-6c89a8d9a879" />
  <h4>Заявка отобразилась в списке<h4>
  <img width="70%" src="https://github.com/user-attachments/assets/94d2c4b2-1f7e-4e8b-a348-43b1fd5a3d91" />
  <h4>Добавление файлов регламента и отчёта о проведении к событию<h4>
  <img width="70%" src="https://github.com/user-attachments/assets/a993a432-4b7f-496c-9668-40c3a1f16554" />
  <h4>Парсинг отчёта о проведении с выведением рейтингового списка</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/75da1e20-6baa-4457-ae6f-c0cb89deea9f" />
  <h4>Просмотр PDF-файлов внутри браузера</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/3f9d953b-56f8-4e1c-925c-835bc0bd2c4b" />

  <h3>Интерфейс регионального представительства</h3>
  <h4>Заявки на проведение мероприятий и регистрацию подразделений у регионального представительства</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/1920e5dc-8a2b-495a-9c6d-86ae890d1127" />
  <h4>Событие появилось в календаре после одобрения заявки</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/7a1c1026-f012-4c7f-a0d9-56c6da63cf5f" />
  <h4>Отклонение заявки</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/8629e2d6-b5ef-45f8-af3f-bc0ee245d045" />
  
  <h4>Уведомления регионального представительства</h4>
  <img width="70%" alt="image" src="https://github.com/user-attachments/assets/a13574c6-55e5-43f9-8987-f7dce9d4048e" />
  <h4>Статистика регионального представительства</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/e61c0f64-592f-4439-aa76-ce19612b734f" />
  <h4>Редактирование данных структурного подразделения региональным представительством</h4>
  <img width="70%" src="https://github.com/user-attachments/assets/1dcf3d01-2e1e-44d7-9ac1-27725666fbe0" />
</details>

## Особенности реализации

-   веб-приложение:
    -   [x] авторизация пользователей с проверкой почты
    -   [x] поддержка ролей регионального представительства и структурного подразделения
    -   [x] возможность подачи заявки на регистрацию аккаунта подразделения и добавление соревнований
    -   [x] просмотр и управление всеми типами заявок региональным представительством
    -   [x] одобренные центром события отображаются в удобном календаре
    -   [x] вывод аналитической информации
    -   [x] уведомления о новых заявках и обращениях, а также изменении их статуса
    -   [x] изменение публичной контактной информации
-   Telegram-бот:
    -   [x] вход в учётную запись через веб-приложение
    -   [x] один из способов получения уведомлений
    -   [x] канал связи между центром и регионами
    -   [x] получение публичных данных о подразделении
    -   [x] получение справочной информации
-   парсер отчётов:
    -   [x] позволяет распознавать результаты соревнований из файлов DOCX
    -   [x] полностью поддерживается структура отчётов ФСП ДНР

## Архитектура

Проект состоит из микросервисов, предназначенных для развёртывания в Docker:

- [веб-приложение](https://github.com/code-418-dpr/FSPodium-web)
- [Telegram-бот](https://github.com/code-418-dpr/FSPodium-bot)
- [файловый сервис](https://github.com/code-418-dpr/FSPodium-file-service)
- [парсер отчётов](https://github.com/code-418-dpr/FSPodium-report-parser)
- PostgreSQL — база данных
- Traefik — обратный прокси

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
