# performance-testing-demo

This project is a practical, end-to-end performance testing demo. It runs a sample online shop application (TeaStore) in Docker and tests it with k6 to measure how fast it responds, how stable it stays under different traffic patterns, and where it starts to struggle. The goal is to provide a repeatable setup you can run locally or in CI to demonstrate real performance testing skills with open-source tooling.

The test scenarios each answer a different question:

- `smoke`: Is the service up and basically responsive after deployment?
- `load`: Does it meet response-time and error-rate targets at expected day-to-day traffic?
- `stress`: How does it behave as traffic is pushed beyond normal levels, and where does it degrade?
- `spike`: Can it absorb sudden bursts of traffic without large error rates or severe latency jumps?

k6 runs these tests using **Virtual Users (VUs)**. A virtual user is a simulated person visiting the site and performing actions (like opening pages). By increasing or decreasing the number of VUs over time, we can mimic realistic traffic patterns and observe how performance changes as more people use the system at once.

When a scenario finishes, k6 prints a summary showing request counts, response times (including p95), error rate, and whether thresholds were met. Treat those results as environment-specific signals, not universal truth: a fast local machine (for example, my M4 Mac Mini) may pass where a slower laptop or a busy CI runner does not. The important outcome is understanding trends and bottlenecks in your own setup, then tuning thresholds to realistic targets for that environment.

Note: `p95` means **95th percentile response time**: 95% of requests finished at or below that time, and the slowest 5% took longer. It is usually more useful than an average because averages can hide occasional slow responses.

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
make teastore-up
```

3. Verify it is running:

```bash
make teastore-ps
```

4. Open TeaStore:

- http://localhost:8080/tools.descartes.teastore.webui/

## k6 Commands

```bash
make k6-smoke
make k6-load
make k6-stress
make k6-spike
make k6-clear
```

Environment overrides for load test profile:

```bash
VUS=20 DURATION=5m make k6-load
```

Default `BASE_URL` is `http://localhost:8080/tools.descartes.teastore.webui`.
Override with:

```bash
BASE_URL=http://localhost:8081/tools.descartes.teastore.webui make k6-smoke
```

`k6-clear` removes local result artifacts under `results/`.

## Tuning Test Profiles For Your Machine

These profiles are starter defaults, not fixed rules. If your machine is slower, start smaller and scale up. If your machine is faster, you can push higher.

Suggested approach:

1. Start with `smoke` and confirm zero errors.
2. For `load`, begin with lower traffic and shorter duration, then increase gradually.
3. Keep `http_req_failed` near zero before increasing pressure further.
4. Adjust thresholds to realistic targets for your environment (local laptop vs CI runner vs shared host).

Useful overrides:

```bash
# lighter load profile (good first run on slower hardware)
VUS=5 DURATION=1m make k6-load

# heavier load profile (for stronger machines)
VUS=30 DURATION=5m make k6-load

# point tests to a different TeaStore endpoint
BASE_URL=http://localhost:8081/tools.descartes.teastore.webui make k6-smoke
```

## GitHub Actions Workflow

Workflow file:

- `.github/workflows/performance-tests.yml`

Triggers:

- Manual: choose one scenario (`smoke`, `load`, `stress`, `spike`)
- Scheduled: daily at 06:00 UTC (runs `smoke`)

What it does:

- Starts TeaStore via Docker Compose
- Waits for WebUI readiness
- Installs k6
- Runs selected scenario
- Uploads `results/*-summary.json` as artifacts
- Always tears down TeaStore and volumes

## Stop and Cleanup

Stop containers (keep DB data):

```bash
make teastore-down
```

Stop and clear all state (including DB volume):

```bash
make teastore-reset
```

## Optional Troubleshooting

View logs:

```bash
make teastore-logs
```

Restart from a clean state:

```bash
make teastore-reset
make teastore-up
```
