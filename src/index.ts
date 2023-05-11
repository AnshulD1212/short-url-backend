import { expressAPI } from './app';
import { logger } from './helpers/logger';

const port = Number(process.env.PORT) || 4000;
expressAPI().listen(port, () => {
  logger.info(`Server started! on port ${port}`);
});
