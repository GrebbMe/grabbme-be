import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  host: process.env.MONGO_HOST || 'mongodb://svc.sel4.cloudtype.app',
  port: process.env.MONGO_PORT ? Number(process.env.MONGO_PORT) : 32138,
  username: process.env.MONGO_USERNAME || 'root',
  password: process.env.MONGO_PASSWORD || 'grabb',
}));
