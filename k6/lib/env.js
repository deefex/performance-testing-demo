const baseUrl = __ENV.BASE_URL || 'http://localhost:8080/tools.descartes.teastore.webui';
const vus = Number(__ENV.VUS || 10);
const duration = __ENV.DURATION || '2m';

export const env = {
  baseUrl,
  vus,
  duration,
};
