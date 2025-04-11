FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/FSPodiumNotificationService/FSPodiumNotificationService.Web/FSPodiumNotificationService.Web.csproj", "src/FSPodiumNotificationService/FSPodiumNotificationService.Web/"]
RUN dotnet restore "src/FSPodiumNotificationService/FSPodiumNotificationService.Web/FSPodiumNotificationService.Web.csproj"
COPY . .
WORKDIR "/src/src/FSPodiumNotificationService/FSPodiumNotificationService.Web"
RUN dotnet build "FSPodiumNotificationService.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "FSPodiumNotificationService.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FSPodiumNotificationService.Web.dll"]
