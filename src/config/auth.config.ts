import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  const authSecrets = {
    jwt_secret: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '30d',
  };
  return authSecrets;
});
