import { check, sleep } from 'k6';
import { env } from '../lib/env.js';
import { stressOptions } from '../lib/options.js';
import { get } from '../lib/http.js';

/**
 * k6 execution options for the stress profile.
 */
export const options = stressOptions;

/**
 * Browsing flow executed while traffic ramps up to stress the system.
 */
export default function () {
  const home = get('/', env.baseUrl);

  check(home, {
    'home contains TeaStore': (r) => r.body && r.body.includes('TeaStore'),
  });

  get('/category?page=1&category=3', env.baseUrl);
  get('/product?id=25', env.baseUrl);

  sleep(1);
}
