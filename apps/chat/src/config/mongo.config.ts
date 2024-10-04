import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  host: process.env.MONGO_HOST,
  port: Number(process.env.MONGO_PORT),
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  uri: process.env.MONGO_URI,
}));
