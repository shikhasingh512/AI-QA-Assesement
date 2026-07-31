const dotenv = require('dotenv');

dotenv.config();

function getEnv(name, defaultValue) {
  const value = process.env[name];
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return value;
}

function getBooleanEnv(name, defaultValue) {
  const value = getEnv(name, defaultValue);
  if (typeof value === 'boolean') {
    return value;
  }
  return value === 'true';
}

function getNumberEnv(name, defaultValue) {
  const value = getEnv(name, defaultValue);
  return Number(value);
}

module.exports = {
  env: {
    BASE_URL: getEnv('BASE_URL', 'https://example.com'),
    HEADLESS: getBooleanEnv('HEADLESS', true),
    SLOW_MO: getNumberEnv('SLOW_MO', 0),
    TRACE: getEnv('TRACE', 'on')
  },
  getEnv,
  getBooleanEnv,
  getNumberEnv
};
