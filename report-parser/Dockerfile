FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["FSPodium-Parser.Web/FSPodium-Parser.Web.csproj", "FSPodium-Parser.Web/"]
COPY ["FSPodium-Parser.BL/FSPodium-Parser.BL.csproj", "FSPodium-Parser.BL/"]
RUN dotnet restore "FSPodium-Parser.Web/FSPodium-Parser.Web.csproj"
COPY . .
WORKDIR "/src/FSPodium-Parser.Web"
RUN dotnet build "FSPodium-Parser.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "FSPodium-Parser.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FSPodium-Parser.Web.dll"]
