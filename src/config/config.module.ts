import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import { validationSchema } from './validation/index';

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: false,
      validationSchema: validationSchema,
      load: [databaseConfig, authConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
