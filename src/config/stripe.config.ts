import { registerAs } from '@nestjs/config';

export default registerAs('stripe', () => ({
  secret_key: process.env.STRIPE_SECRET_KEY,
}));
