
# File Service FSPodium

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET Version](https://img.shields.io/badge/.NET-v8-blue)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-orange)](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)
[![Hangfire](https://img.shields.io/badge/Hangfire-v1.8.0-green)](https://www.hangfire.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4-brightgreen)](https://www.mongodb.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14-yellow)](https://www.postgresql.org/)
[![AWS SDK for .NET](https://img.shields.io/badge/AWS%20SDK%20for%20.NET-v3.7.100-blue)](https://aws.amazon.com/sdk-for-net/)
[![Seq](https://img.shields.io/badge/Seq-v6.2.0-orange)](https://datalust.co/seq)
[![Serilog](https://img.shields.io/badge/Serilog-v2.12.0-green)](https://serilog.net/)

Приложение ASP.NET Core Web API для управления файлами, использующее Hangfire для асинхронных задач, MongoDB для хранения метаданных файлов и AWS S3 SDK для взаимодействия с AWS S3 или Minio.

## Особенности

- Построен на ASP.NET Core Web API 8.0
- Использует Hangfire для асинхронной обработки задач (загрузка, скачивание, удаление файлов)
- Использует MongoDB для хранения метаданных файлов
- Использует PostgreSQL для хранения информации о hangfire задачах
- Использует AWS S3 SDK для взаимодействия с AWS S3 или Minio
- Использует Seq и Serilog для логирования

## Стек

- **[C#](https://docs.microsoft.com/en-us/dotnet/csharp/)** - язык программирования
- **[.NET 8](https://dotnet.microsoft.com/)** - платформа .NET
- **[ASP.NET Core Web API](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)** - фреймворк для создания RESTful API
- **[Hangfire](https://www.hangfire.io/)** - библиотека для асинхронной обработки задач
- **[MongoDB](https://www.mongodb.com/)** - NoSQL база данных для хранения метаданных файлов
- **[PostgreSQL](https://www.postgresql.org/)** - реляционная база данных для хранения информации о пользователях и ролях
- **[AWS SDK for .NET](https://aws.amazon.com/sdk-for-net/)** - библиотека для взаимодействия с AWS S3
- **[Seq](https://datalust.co/seq)** - платформа для централизованного сбора и анализа логов
- **[Serilog](https://serilog.net/)** - библиотека для логирования

## Развертывание

1. Клонируйте репозиторий и перейдите в папку проекта.
2. Откройте решение в Visual Studio или другой IDE, поддерживающей .NET 8.
3. Настройте подключение к MongoDB, PostgreSQL и AWS S3 (или Minio) в файле `appsettings.json`.
4. Запустите приложение. Оно будет доступно по умолчанию по адресу `https://localhost:5290/`.
5. Откройте Swagger-интерфейс, перейдя по адресу `https://localhost:5290/swagger`.
6. В Swagger-интерфейсе вы можете протестировать и документировать API-методы вашего приложения.

## Развертывание через Docker

Для развертывания приложения с помощью Docker выполните следующие команды:

```bash
# Клонируйте репозиторий
git clone <URL репозитория>
cd <папка проекта>

# Соберите образ Docker
docker build -t fs-podium .

# Запустите контейнер
docker run -d -p 8080:8080 -p 8081:8081 --name fs-podium-container fs-podium
```
