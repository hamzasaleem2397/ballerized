import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  const authSecrets = {
    jwt_secret: process.env.JWT_SECRET,
    jwt_refresh_expiry: parseInt(process.env.JWT_EXPIRY, 10) || 2592000,
  };
  return authSecrets;
});