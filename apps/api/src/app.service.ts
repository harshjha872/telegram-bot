import { Injectable } from '@nestjs/common';
import supabase from '../supabase';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAllUsers() {
    const users = await supabase.from('subscribed-users').select();
    return users.data;
  }

  async deleteUser(id: number) {
    const { error } = await supabase
      .from('subscribed-users')
      .delete()
      .eq('chatId', id);

    if (!error) return 'user deleted!';
  }
}
