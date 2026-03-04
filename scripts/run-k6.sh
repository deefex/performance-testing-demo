#!/usr/bin/env bash
# Thin wrapper around k6 that standardizes scenario execution and result output.
set -euo pipefail

SCENARIO="${1:-}"
OUTPUT_DIR="results"

if [[ -z "${SCENARIO}" ]]; then
  echo "Usage: $0 <smoke|load|stress|spike|clear>"
  exit 1
fi

mkdir -p "${OUTPUT_DIR}"

case "${SCENARIO}" in
  clear)
    # Remove previously exported k6 summaries.
    rm -rf "${OUTPUT_DIR}"/*
    echo "Cleared ${OUTPUT_DIR}/"
    ;;
  smoke|load|stress|spike)
    # k6 is an external dependency and may not be installed on fresh machines.
    if ! command -v k6 >/dev/null 2>&1; then
      echo "k6 is not installed or not on PATH."
      echo "Install: https://grafana.com/docs/k6/latest/set-up/install-k6/"
      exit 1
    fi

    SCRIPT="k6/scenarios/${SCENARIO}.js"
    if [[ ! -f "${SCRIPT}" ]]; then
      echo "Missing ${SCRIPT}. Add the scenario file under k6/scenarios/."
      exit 1
    fi

    # Export a machine-readable summary for local review and CI artifacts.
    k6 run \
      --summary-export "${OUTPUT_DIR}/${SCENARIO}-summary.json" \
      "${SCRIPT}"
    ;;
  *)
    echo "Unsupported scenario: ${SCENARIO}"
    echo "Usage: $0 <smoke|load|stress|spike|clear>"
    exit 1
    ;;
esac
