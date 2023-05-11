import pino from 'pino';

const nodeEnv = process.env.NODE_ENV || 'development';

export const logger = pino({
  level: /^development/.test(nodeEnv) ? 'debug' : 'info',
  formatters: {
    level(level) {
      return { level };
    }
  }
});
