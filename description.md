# FitFriends

## Запуск

1. Колонировать репозиторий:
```
git clone git@github.com:VsNik/fit-friends.git
```

2. Скопировать .env.example как .env
```
cp ./apps/backend/.env.example ./apps/backend/.env
```

3. Установка зависимостей

```
npm install
```
4. Запуск внешних сервисов

```
docker compose up -d
или
make up
```
5. Выполнение миграций
```
npm run migration:run
```

Запуск Backend:

```
nx serve backend
или
nx run backend:serve
или
npm run start
или
make backend
```
#### backend запускается по адресу:
http://localhost:5000/api
#### OpenAPI спецификация доступна по адресу:
http://localhost:5000/docs

## Переменные окружения:
NODE_ENV=окружение

PORT=порт

SERVER_HOST=URL адрес сервера

UPLOAD_DIR=директория загрузок

SERVE_ROOT=префикс адреса загрузок

STATIC_DIR=директория со статикой

STATIC_ROOT=префикс адреса статики

DATABASE_URL=строка подключения к БД

JWT_ACCESS_SECRET=секрет Access Token

JWT_REFRESH_SECRET=секрет Refresh Token

JWT_ACCESS_EXPIRE=время жизни Access Token

JWT_REFRESH_EXPIRE=время жизни Refresh Token

MAIL_SMTP_HOST=Хост почтового сервера

MAIL_SMTP_PORT=Порт почтового сервера

MAIL_USER_NAME=Логин почты

MAIL_USER_PASSWORD=Пароль почты

MAIL_FROM=FROM письма

## Доступные сценарии:
```
nx serve backend
nx run backend:lint
nx run-many --targets=lint
npm run build
npm run start
npm run lint
npm run migration:gen --name=<имя миграции>
npm run migration:run
npm run db:drop
npm run db:seed
```
## Makefile доступные сценарии:
```
make up - запуск Docker
make down - остановка Docker
make clear - очистка Docker
make restart - перезапуск Docker
make ps - docker статус
make backend - запуск сервера
make backend-lint - запуск линтера
```
