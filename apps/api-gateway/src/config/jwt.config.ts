import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    accessSignOptions: { expiresIn: '15m' },
    refreshSignOptions: { expiresIn: '7d' },
  };
});
