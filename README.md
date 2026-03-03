# performance-testing-demo

Chunk 1 sets up a local Dockerized TeaStore instance as the target system for later k6 tests.

## Prerequisites

- Docker Desktop (or Docker Engine + Compose v2)

## Quick Start

1. Copy env defaults:

```bash
cp .env.example .env
```

2. Start TeaStore:

```bash
docker compose -f docker-compose.teastore.yml up -d
```

3. Verify it is running:

```bash
docker compose -f docker-compose.teastore.yml ps
```

4. Open TeaStore:

- http://localhost:8080/tools.descartes.teastore.webui/

## Stop and Cleanup

Stop containers (keep DB data):

```bash
docker compose -f docker-compose.teastore.yml down
```

Stop and clear all state (including DB volume):

```bash
docker compose -f docker-compose.teastore.yml down -v --remove-orphans
```

## Optional Troubleshooting

View logs:

```bash
docker compose -f docker-compose.teastore.yml logs -f webui
```

Restart from a clean state:

```bash
docker compose -f docker-compose.teastore.yml down -v --remove-orphans
docker compose -f docker-compose.teastore.yml up -d
```
