/**
 * Runtime environment values for k6 scenarios.
 * Supports overriding defaults with BASE_URL, VUS, and DURATION.
 */
const baseUrl = __ENV.BASE_URL || 'http://localhost:8080/tools.descartes.teastore.webui';
const vus = Number(__ENV.VUS || 10);
const duration = __ENV.DURATION || '2m';

/**
 * Shared environment configuration consumed by scenario option builders.
 * @type {{baseUrl: string, vus: number, duration: string}}
 */
export const env = {
  baseUrl,
  vus,
  duration,
};
