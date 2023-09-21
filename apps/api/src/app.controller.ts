import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get_users')
  getUsers() {
    return this.appService.getAllUsers();
  }

  @Post('delete_user')
  deleteUser(@Body() chatIdObj: any ) {
    return this.appService.deleteUser(chatIdObj.chatId);
  }
}
