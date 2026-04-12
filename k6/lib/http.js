import http from 'k6/http';
import { check } from 'k6';

/**
 * Executes an HTTP GET against the target base URL and applies a basic 200 check.
 * @param {string} path Relative route to request (for example `/` or `/product?id=7`).
 * @param {string} baseUrl TeaStore base URL.
 * @param {import('k6/http').Params} [params] Optional k6 request params (e.g. `{ timeout: '10s' }`).
 * @returns {import('k6/http').RefinedResponse<'text'>}
 */
export function get(path, baseUrl, params = {}) {
  const url = `${baseUrl}${path}`;
  const response = http.get(url, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  return response;
}
