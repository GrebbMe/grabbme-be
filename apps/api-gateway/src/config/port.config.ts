import { registerAs } from '@nestjs/config';

export default registerAs('port', () => ({
  gateway: Number(process.env.GATEWAY_PORT),
  user: Number(process.env.USER_PORT),
  board: Number(process.env.BOARD_PORT),
}));
