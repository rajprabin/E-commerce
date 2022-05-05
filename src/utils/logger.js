const Winston = require('winston')

// const logConfiguration = {
//   'transports': [
//       new Winston.transports.File({
//           filename: 'logs/example.log'
//       })
//   ]
// };

// const logger = Winston.createLogger(logConfiguration);

const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
transports:
    new transports.File({
    filename: 'src/logs/server.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
})