import * as expressBasicAuth from 'express-basic-auth';

export const swaggerAuthMiddleware = expressBasicAuth({
  users: { flash: process.env.SWAGGER_PASSWORD },
  challenge: true,
  unauthorizedResponse: 'Unauthorized',
});
