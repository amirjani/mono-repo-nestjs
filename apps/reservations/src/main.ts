import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
