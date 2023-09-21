import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get('start')
  start(@Param('chatId') chatId: number) {
    this.telegramService.sendWelcomeMessage(chatId);
  }
}
