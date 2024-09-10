import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.MYSQL_HOST || 'svc.sel4.cloudtype.app',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 32528,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'grebb',
  database: process.env.MYSQL_DATABASE || 'grabb',
}));
