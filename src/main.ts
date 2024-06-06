import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = parseInt(process.env.PORT, 10) || 3000;

  await app.listen(port);

  return port;
}
bootstrap().then((port) => {
  console.log('🍀🍀 Server was started on port', port, '🍀🍀');
});
