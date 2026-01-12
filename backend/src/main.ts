import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for React Native app
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  // API prefix
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3000;
  // Listen on all network interfaces (0.0.0.0) to allow connections from physical devices and hosting services
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://0.0.0.0:${port}`);
  console.log(`Port: ${port}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Local access: http://localhost:${port}`);
    console.log(`Network access: http://YOUR_IP:${port} (replace YOUR_IP with your computer's IP address)`);
  }
}

bootstrap();

