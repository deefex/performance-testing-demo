import { check, sleep } from 'k6';
import { env } from '../lib/env.js';
import { smokeOptions } from '../lib/options.js';
import { get } from '../lib/http.js';

/**
 * k6 execution options for the smoke profile.
 */
export const options = smokeOptions;

/**
 * Minimal user journey used to verify TeaStore is available and responsive.
 */
export default function () {
  const home = get('/', env.baseUrl);

  check(home, {
    'home contains TeaStore': (r) => r.body && r.body.includes('TeaStore'),
  });

  sleep(1);
}
