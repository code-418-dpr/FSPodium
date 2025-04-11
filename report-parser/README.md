# FSPodium Report Parser

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET Version](https://img.shields.io/badge/.NET-v9-blue)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-orange)](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-9.0)
[![Serilog](https://img.shields.io/badge/Serilog-v2.12.0-green)](https://serilog.net/)
[![Swagger](https://img.shields.io/badge/Swagger-v6.5.0-brightgreen)](https://swagger.io/)
[![DocumentFormat.OpenXML](https://img.shields.io/badge/DocumentFormat.OpenXML-v2.19.0-yellow)](https://github.com/OfficeDev/Open-XML-SDK)

ASP.NET Core Web API для парсинга отчетов, использующий DocumentFormat.OpenXML для работы с файлами Office

## Особенности разработки
- [x] построен на ASP.NET Core Web API 9.0
- [x] использует Serilog для логирования
- [x] предоставляет Swagger-интерфейс для документации и тестирования API
- [x] использует DocumentFormat.OpenXML для парсинга файлов Office
- [x] поддерживает загрузку и обработку отчетов в формате Excel (.xlsx)

## Стек
- **[C#](https://docs.microsoft.com/en-us/dotnet/csharp/)** — язык программирования
- **[.NET 9](https://dotnet.microsoft.com/)** — платформа .NET
- **[ASP.NET Core Web API](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-9.0)** — фреймворк для создания RESTful API
- **[Serilog](https://serilog.net/)** — библиотека для логирования
- **[Swagger](https://swagger.io/)** — инструмент для документирования и тестирования API
- **[DocumentFormat.OpenXML](https://github.com/OfficeDev/Open-XML-SDK)** — библиотека для работы с файлами Office

## Запуск у себя
0. Клонируйте репозиторий и перейдите в папку проекта.

### Через Swagger
1. Откройте решение в Visual Studio или другой IDE, поддерживающей .NET 9.
2. Запустите приложение. Оно будет доступно по умолчанию по адресу `https://localhost:5290/`.
3. Откройте Swagger-интерфейс, перейдя по адресу `https://localhost:5290/swagger`.
4. В Swagger-интерфейсе вы можете протестировать и документировать API-методы вашего приложения.

### через Docker

1. Соберите образ Docker:
```bash
docker build -t fs-podium-parser .
```
2. Запустите контейнер
```bash
docker run -d -p 8080:8080 -p 8081:8081 --name fspodium-parser-container fs-podium-parser
```
