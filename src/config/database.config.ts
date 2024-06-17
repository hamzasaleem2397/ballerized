import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo_connection: process.env.MONGOSE_URL,
}));
