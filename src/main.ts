// ./src/main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    // set a user and password
    ['/api-docs', '/api-docs-json'],
    basicAuth({
      challenge: true,
      users: {
        admin: 'safepassword', // [user name] : [password : string]
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Set password to Swagger Doc')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
