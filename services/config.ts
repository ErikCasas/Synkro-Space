/* eslint-disable n/no-process-env */
import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';


const envPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
  throw result.error;
}

console.log('✅ Loaded environment from', envPath);

if (__filename.endsWith('.js')) {
  moduleAlias.addAlias('@src', path.join(__dirname, '/dist'));
}
