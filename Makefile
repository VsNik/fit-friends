up: docker-up
down: docker-down
clear: docker-clear
restart: down up
ps: docker-ps

backend: backend-start

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-clear:
	docker compose down --remove-orphans

docker-ps:
	docker compose ps

backend-start:
	nx run backend:serve

backend-lint:
	nx run backend:lint
