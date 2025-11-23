import logger from 'jet-logger';
import server from './server';
import { seedEntities, seedRoles, seedUsers } from '@common/seed';


const SERVER_START_MSG = (
  'Express server started on port: ' + 3000
);

(async function bootstrap() {
  await seedRoles();
  await seedUsers();
  await seedEntities();
  server.listen(3000, err => {
    if (!!err) {
      logger.err(err.message);
    } else {
      logger.info(SERVER_START_MSG);
    }
  });
})();


