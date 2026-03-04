import { env } from './env.js';

export const sharedThresholds = {
  http_req_failed: ['rate<0.01'],
  'http_req_duration{expected_response:true}': ['p(95)<400'],
};

export const smokeThresholds = {
  http_req_failed: ['rate<0.01'],
  http_req_duration: ['p(95)<500'],
};

export const smokeOptions = {
  vus: 5,
  duration: '1m',
  thresholds: smokeThresholds,
};

export const loadOptions = {
  vus: env.vus,
  duration: env.duration,
  thresholds: sharedThresholds,
};

export const stressOptions = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '3m', target: 30 },
    { duration: '3m', target: 60 },
    { duration: '2m', target: 0 },
  ],
  thresholds: sharedThresholds,
};

export const spikeOptions = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '30s', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '30s', target: 5 },
  ],
  thresholds: sharedThresholds,
};
