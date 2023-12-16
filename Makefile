up: docker-up
down: docker-down
clear: docker-clear
restart: down up
ps: docker-ps

test: frontend-test
test-cover: frontend-test-coverage

start: frontend-backend-start
backend: backend-start
frontend: frontend-start

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-clear:
	docker compose down --remove-orphans -v

docker-ps:
	docker compose ps

backend-start:
	nx run backend:serve

frontend-start:
	nx run frontend:serve

frontend-backend-start:
	nx run-many --target=serve --all --parallel=10

backend-lint:
	nx run backend:lint

frontend-lint:
	nx run frontend:lint

frontend-test:
	nx run frontend:test

frontend-test-coverage:
	nx run frontend:test --coverage
