FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 6030

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/FSPodiumFileService/FSPodiumFileService.Web/FSPodiumFileService.Web.csproj", "src/FSPodiumFileService/FSPodiumFileService.Web/"]
RUN dotnet restore "src/FSPodiumFileService/FSPodiumFileService.Web/FSPodiumFileService.Web.csproj"
COPY . .
WORKDIR "/src/src/FSPodiumFileService/FSPodiumFileService.Web"
RUN dotnet build "FSPodiumFileService.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "FSPodiumFileService.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FSPodiumFileService.Web.dll"]
