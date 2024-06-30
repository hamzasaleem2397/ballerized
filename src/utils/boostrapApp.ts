import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { swaggerAuthMiddleware } from './swaggerAuth';
import { AuthorizationHeader } from './types';

export async function bootstrapApp(app: NestExpressApplication) {
  app.use('/api-documentation', swaggerAuthMiddleware);

  const config = new DocumentBuilder()
    .setTitle('Ballerized')
    .setDescription('ballerized backend with Nestjs')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      AuthorizationHeader.BEARER,
    )
    .build();
  const theme = new SwaggerTheme();

  const options = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
}
