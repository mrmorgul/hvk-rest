const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: '/var/lib/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/var/lib/logs/combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const error = (message, className) => {
    logger.error(
        {
            message: message,
            date: new Date(),
            className: className
        });
}

const warn = (message, className) => {
    logger.warn(
        {
            message: message,
            date: new Date(),
            className: className
        });
}

const info = (message, className) => {
    logger.info(
        {
            message: message,
            date: new Date(),
            className: className
        });
}

module.exports = {
    error,
    warn,
    info
};