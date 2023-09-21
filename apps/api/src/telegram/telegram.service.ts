import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as cron from 'cron';
import supabase from '../../supabase';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly bot: any;
  private cron_test: cron.CronJob;

  constructor() {
    this.bot = new TelegramBot(
      '6109532890:AAEMaFX0ytE253gyY_lkvlmqKTaBnNseoQg',
      { polling: true },
    );

    this.bot.onText(/\/start/, this.replyToStartMsg);

    this.bot.onText(/\/subscribe/, this.subscribeUser);
    this.bot.onText(/\/unsubscribe/, this.unsubscribeUser);
    this.bot.on('message', this.replyToNormalText);

    this.cron_test = new cron.CronJob(
      '0 */3 * * *',
      this.sendDailyWeatherUpdates,
    );

    //!Cron job for Daily weather updates
    this.cron_test.start();

    // this.getUsers();
    this.bot.on('polling_error', console.log);
  }

  sendDailyWeatherUpdates = async () => {
    const AllUsers = await this.getUsers();
    const chatIds = AllUsers.map((user) => user.chatId);
    const weatherData = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=28.535517&lon=77.391029&appid=e69c31ccd31205ed81fc6df0c2580a19',
    );
    // console.log(weatherData.data);

    chatIds.forEach((chatId) =>
      this.bot.sendMessage(
        chatId,
        `Weather today - ${weatherData.data.weather[0].main} with ${(weatherData.data.main.temp - 273.15).toFixed(2)}°C ✨`,
        // C = K - 273.15
      ),
    );
  };

  sendWelcomeMessage = (chatId: number) => {
    this.bot.sendMessage(chatId, 'Welcome test message');
  };

  replyToNormalText = (msg: any) => {
    console.log(msg)
    if (msg.text !== '/subscribe' && msg.text !== '/start' && msg.text !== '/unsubscribe') {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        'Welcome to weather bot, use /subscribe to get daily updates on the weather 📣🔔',
      );
    }
  };

  replyToStartMsg = (msg: any) => {
    const chatId = msg.chat.id;
    this.bot.sendMessage(
      chatId,
      'Welcome to the Daily Update Bot! Use /subscribe to receive daily updates 📣🔔',
    );
  };

  getUsers = async () => {
    const users = await supabase.from('subscribed-users').select();
    return users.data;
  };

  subscribeUser = async (msg: any) => {
    const AllUsers = await this.getUsers();
    const user = AllUsers.find((user) => user.chatId === msg.chat.id);
    if (!user) {
      const subscribe_user = await supabase
        .from('subscribed-users')
        .insert([{ username: msg.chat.username, chatId: msg.chat.id, first_name: msg.chat.first_name }])
        .select();

      if (subscribe_user.statusText === 'Created') {
        this.bot.sendMessage(
          msg.chat.id,
          `Hi ${msg.chat.first_name}, you're now subscribed to daily weather report 🎉🎉`,
        );
      }
    } else {
      this.bot.sendMessage(
        msg.chat.id,
        `Hi ${msg.chat.first_name}, it seems you're already subscribed 🏁`,
      );
    }
  };

  unsubscribeUser = async (msg: any) => {
    const AllUsers = await this.getUsers();
    const user = AllUsers.find((user) => user.chatId === msg.chat.id);
    if (!user) {
      this.bot.sendMessage(
        msg.chat.id,
        `Hi ${msg.chat.first_name}, you're not subscribed to daily weather report yet Use /subscribe to receive daily updates 🌞🌚`,
      );
    } else {
      const { error } = await supabase
      .from('subscribed-users')
      .delete()
      .eq('chatId', msg.chat.id);

      this.bot.sendMessage(
        msg.chat.id,
        `Hi ${msg.chat.first_name}, you're now unsubscribed 😱🥶`,
      );
    }
  };
}
