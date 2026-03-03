# performance-testing-demo

Chunk 1 sets up a local dockerised TeaStore instance as the target system for later k6 tests.
Chunk 2 adds the k6 project skeleton and runner commands.
Chunk 3 adds the first working scenario: smoke.

## Prerequisites

- Docker Desktop (or Docker Engine + Compose v2)
- k6 CLI ([https://grafana.com/docs/k6/latest/set-up/install-k6/](https://grafana.com/docs/k6/latest/set-up/install-k6/))

## TeaStore Quick Start

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

## k6 Commands

Working now:

```bash
make k6-smoke
make k6-clear
```

Planned in next chunk:

```bash
make k6-load
make k6-stress
make k6-spike
```

`k6-clear` removes local result artifacts under `results/`.

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
