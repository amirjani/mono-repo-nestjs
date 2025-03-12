import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { Logger } from 'nestjs-pino';
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            colorizeObjects: true,
            singleLine: true,
          },
        },
      },
    }),
  ],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
