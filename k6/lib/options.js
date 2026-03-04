import { env } from './env.js';

/**
 * Default thresholds for non-smoke tests.
 * Measures latency on successful responses only.
 */
export const sharedThresholds = {
  http_req_failed: ['rate<0.01'],
  'http_req_duration{expected_response:true}': ['p(95)<400'],
};

/**
 * Slightly relaxed threshold for local smoke checks.
 */
export const smokeThresholds = {
  http_req_failed: ['rate<0.01'],
  http_req_duration: ['p(95)<500'],
};

/**
 * Smoke scenario options: quick confidence check that the app is up.
 */
export const smokeOptions = {
  vus: 5,
  duration: '1m',
  thresholds: smokeThresholds,
};

/**
 * Load scenario options: configurable steady-state traffic.
 */
export const loadOptions = {
  vus: env.vus,
  duration: env.duration,
  thresholds: sharedThresholds,
};

/**
 * Stress scenario options: ramp beyond typical traffic to find degradation points.
 */
export const stressOptions = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '3m', target: 30 },
    { duration: '3m', target: 60 },
    { duration: '2m', target: 0 },
  ],
  thresholds: sharedThresholds,
};

/**
 * Spike scenario options: short burst traffic to test sudden demand resilience.
 */
export const spikeOptions = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '30s', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '30s', target: 5 },
  ],
  thresholds: sharedThresholds,
};
