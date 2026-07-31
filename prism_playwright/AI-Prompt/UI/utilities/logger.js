const winston = require("winston");

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Set the log level
  format: winston.format.simple(), // Set the log format
  transports: [
    new winston.transports.Console(), // Output logs to the console
    new winston.transports.File({ filename: "executionResultLogs.log" }) // Output logs to a file
  ]
});

module.exports = {
  logger
};