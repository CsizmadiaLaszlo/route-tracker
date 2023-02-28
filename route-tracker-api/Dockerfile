FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["route-tracker-api/route-tracker-api.csproj", "route-tracker-api/"]
RUN dotnet restore "route-tracker-api/route-tracker-api.csproj"
COPY . .
WORKDIR "/src/route-tracker-api"
RUN dotnet build "route-tracker-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "route-tracker-api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "route-tracker-api.dll"]
