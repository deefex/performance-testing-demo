.PHONY: teastore-up teastore-down teastore-reset teastore-ps teastore-logs k6-smoke k6-load k6-stress k6-spike k6-clear

teastore-up:
	docker compose -f docker-compose.teastore.yml up -d

teastore-down:
	docker compose -f docker-compose.teastore.yml down

teastore-reset:
	docker compose -f docker-compose.teastore.yml down -v --remove-orphans

teastore-ps:
	docker compose -f docker-compose.teastore.yml ps

teastore-logs:
	docker compose -f docker-compose.teastore.yml logs -f webui

k6-smoke:
	./scripts/run-k6.sh smoke

k6-load:
	./scripts/run-k6.sh load

k6-stress:
	./scripts/run-k6.sh stress

k6-spike:
	./scripts/run-k6.sh spike

k6-clear:
	./scripts/run-k6.sh clear
