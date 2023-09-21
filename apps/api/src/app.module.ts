import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { GoogleStrategy } from './google/login.google';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client', 'dist'),
    }),
    TelegramModule,
  ],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleStrategy, GoogleService],
})
export class AppModule {}
