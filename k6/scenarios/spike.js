import { check, sleep } from 'k6';
import { env } from '../lib/env.js';
import { spikeOptions } from '../lib/options.js';
import { get } from '../lib/http.js';

export const options = spikeOptions;

export default function () {
  const home = get('/', env.baseUrl);

  check(home, {
    'home contains TeaStore': (r) => r.body && r.body.includes('TeaStore'),
  });

  get('/category?page=1&category=4', env.baseUrl);
  get('/product?id=12', env.baseUrl);

  sleep(1);
}
