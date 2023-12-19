# FitFriends

## Запуск

Запуск приложения в Docker осуществляется в 2 этапа:

- Сборка базового образа, на основе которого будет осуществлятся сборка остальных образов (friends-backend:1.0 и friends-frontend:1.0).
- Сборка образов приложения

#### Порядок сборки и запуска

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
4. Сборка базового Docker образа "friends-base:1.0"
```
docker build . -t friends-base:1.0
или
make build-base
```
5. Сборка образов и приложения
```
docker compose up -d
или
make up
```
если нужна просто сборка (без запуска)
```
docker compose build
или
make build
```
6. Накатить миграции БД
```
npm run migration:run
или
make db-migration
```

Наэтом этапе приложение готово к работе, если нужны тестовые данные - запустите:

пароль ко всем пользователям - password
```
npm run db:seed
или
make db-seed
```
Для очистки БД - запустите:
```
npm run db:drop
или
make db-drop
```

#### Запуск линтера:
```
nx run-many --target=lint --all --parallel=10
или
make lint
```
#### Запуск тестов
```
nx run frontend:test
или
make test
```
Для тестов с покрытием:
```
nx run frontend:test --coverage
или
make test-cover
```
приложения доступы:
```
http://localhost:4200
Бэкенд Rest API Спецификация:
http://localhost:5000/docs
Тестовый SMTP:
http://localhost:8025
```

### Сборка и запуск в production
Сдесь все по аналогии.
Используются те-же Докерфайлы (Dockerfile),
docker-compose-prod.yml отличается только пробросом "production",
и отсутствием пробросов томов из оброзов.
Поэтому при перезапуске в production - файлы сохранятся не будут (картинки и видео)

#### Порядок
1. После сборки базового образа запустите:
```
docker compose -f docker-compose-prod.yml up -d
если нужна только сборка
docker compose -f docker-compose-prod.yml build -d
```
сдесь создаются образы:

- friends-backend-prod:1.0
- friends-frontend-prod:1.0

и запускается приложение

2. Накатить миграции БД
```
npm run migration:run
или
make db-migration
```

Примечание: Для запуска через "make" - должна быть установлена "make" утилита:
```
Ubuntu
sudo apt install make
Arch linux
sudo pacman -S make
```
Так-же максимальный размер загружаемого файла - 300мб, зтот размер можно изменить в файле: "apps / frontend / nginx.conf" строка: "client_max_body_size 300M;" в секции: "http"

Работа скриптов проверялась на OS Arch linux, kernel 6.5
