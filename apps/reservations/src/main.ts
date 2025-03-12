import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
