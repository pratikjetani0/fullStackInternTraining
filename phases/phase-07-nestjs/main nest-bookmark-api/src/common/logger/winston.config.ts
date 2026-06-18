import * as winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

export const winstonConfig = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH-mm-ss',
    }),
    winston.format.errors({
      stack: true,
    }),
    winston.format.printf(({ timestamp, level, context, message, stack }) => {
      return (
        `[${timestamp}] ${level.toUpperCase()} [${context}] ${message}\n` +
        (stack ? `${stack}\n` : '') +
        '--------------------------------------------------\n'
      );
    }),
  ),

  transports: [
    ...(isProduction
      ? []
      : [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp(),
              winston.format.printf(
                ({ timestamp, level, context, message }) =>
                  `[${timestamp}] ${level} [${context}] ${message}`,
              ),
            ),
          }),
        ]),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});
