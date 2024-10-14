import { registerAs } from '@nestjs/config';

export default registerAs('network', () => {
  return {
    CLIENT_MAIN_URL: process.env.CLIENT_MAIN_URL,
    CLIENT_SIGNUP_URL: process.env.CLIENT_SIGNUP_URL,
  };
});
