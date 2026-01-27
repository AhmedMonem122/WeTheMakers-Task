import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PrismaService } from './prisma/prisma.service';

export async function createApp() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.useGlobalGuards(app.get(ThrottlerGuard));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  return app;
}

async function bootstrap() {
  const app = await createApp();
  const port = process.env.PORT || 3001;
  await app.listen(port as number);
}

// Only run when not in serverless environment
if (process.env.VERCEL !== '1') {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  bootstrap();
}

