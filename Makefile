up: docker-up
down: docker-down
clear: docker-clear
restart: down up
ps: docker-ps

lint: application-lint
test: frontend-test
test-cover: frontend-test-coverage

start: frontend-backend-start

build-base: docker-build-base
build: docker-build

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-clear:
	docker compose down --remove-orphans -v

docker-ps:
	docker compose ps

frontend-test:
	nx run frontend:test

frontend-test-coverage:
	nx run frontend:test --coverage

docker-build-base:
	docker build . -t friends-base:1.0

docker-build:
	docker compose build

frontend-backend-start:
	nx run-many --target=serve --all --parallel=10

application-lint:
	nx run-many --target=lint --all --parallel=10