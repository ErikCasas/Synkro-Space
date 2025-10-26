import logger from 'jet-logger';
import ENV from '@src/common/constants/ENV';
import server from './server';
import { seedRoles, seedUsers } from '@common/seed';


const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);

(async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await seedRoles();
  await seedUsers();
  server.listen(ENV.Port, err => {
    if (!!err) {
      logger.err(err.message);
    } else {
      logger.info(SERVER_START_MSG);
    }
  });
})();


