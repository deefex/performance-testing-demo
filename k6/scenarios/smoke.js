import { check, sleep } from 'k6';
import { env } from '../lib/env.js';
import { smokeOptions } from '../lib/options.js';
import { get } from '../lib/http.js';

export const options = smokeOptions;

export default function () {
  const home = get('/', env.baseUrl);

  check(home, {
    'home contains TeaStore': (r) => r.body && r.body.includes('TeaStore'),
  });

  sleep(1);
}
