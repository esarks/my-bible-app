// logger.js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json() // structured JSON logs for Cloud Logging
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;

