import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as httpContext from 'express-http-context';


async function bootstrap() {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(httpContext.middleware);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

