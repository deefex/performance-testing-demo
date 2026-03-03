#!/usr/bin/env bash
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
    rm -rf "${OUTPUT_DIR}"/*
    echo "Cleared ${OUTPUT_DIR}/"
    ;;
  smoke|load|stress|spike)
    SCRIPT="k6/scenarios/${SCENARIO}.js"
    if [[ ! -f "${SCRIPT}" ]]; then
      echo "Missing ${SCRIPT}. Add scenarios in chunk 3."
      exit 1
    fi

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
