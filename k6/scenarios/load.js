import { check, sleep } from 'k6';
import { env } from '../lib/env.js';
import { loadOptions } from '../lib/options.js';
import { get } from '../lib/http.js';

/**
 * k6 execution options for the load profile.
 */
export const options = loadOptions;

/**
 * Representative browsing flow under normal day-to-day traffic.
 */
export default function () {
  const home = get('/', env.baseUrl);

  check(home, {
    'home contains TeaStore': (r) => r.body && r.body.includes('TeaStore'),
  });

  get('/category?page=1&category=2', env.baseUrl);
  get('/product?id=7', env.baseUrl);

  sleep(1);
}
