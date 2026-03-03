import http from 'k6/http';
import { check } from 'k6';

export function get(path, baseUrl) {
  const url = `${baseUrl}${path}`;
  const response = http.get(url);

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  return response;
}
