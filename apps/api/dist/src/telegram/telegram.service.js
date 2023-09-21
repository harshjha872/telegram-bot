"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const cron = require("cron");
const supabase_1 = require("../../supabase");
const axios_1 = require("axios");
let TelegramService = class TelegramService {
    constructor() {
        this.sendDailyWeatherUpdates = async () => {
            const AllUsers = await this.getUsers();
            const chatIds = AllUsers.map((user) => user.chatId);
            const weatherData = await axios_1.default.get('https://api.openweathermap.org/data/2.5/weather?lat=28.535517&lon=77.391029&appid=e69c31ccd31205ed81fc6df0c2580a19');
            chatIds.forEach((chatId) => this.bot.sendMessage(chatId, `Weather today - ${weatherData.data.weather[0].main} with ${(weatherData.data.main.temp - 273.15).toFixed(2)}°C ✨`));
        };
        this.sendWelcomeMessage = (chatId) => {
            this.bot.sendMessage(chatId, 'Welcome test message');
        };
        this.replyToNormalText = (msg) => {
            console.log(msg);
            if (msg.text !== '/subscribe' && msg.text !== '/start' && msg.text !== '/unsubscribe') {
                const chatId = msg.chat.id;
                this.bot.sendMessage(chatId, 'Welcome to weather bot, use /subscribe to get daily updates on the weather 📣🔔');
            }
        };
        this.replyToStartMsg = (msg) => {
            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, 'Welcome to the Daily Update Bot! Use /subscribe to receive daily updates 📣🔔');
        };
        this.getUsers = async () => {
            const users = await supabase_1.default.from('subscribed-users').select();
            return users.data;
        };
        this.subscribeUser = async (msg) => {
            const AllUsers = await this.getUsers();
            const user = AllUsers.find((user) => user.chatId === msg.chat.id);
            if (!user) {
                const subscribe_user = await supabase_1.default
                    .from('subscribed-users')
                    .insert([{ username: msg.chat.username, chatId: msg.chat.id, first_name: msg.chat.first_name }])
                    .select();
                if (subscribe_user.statusText === 'Created') {
                    this.bot.sendMessage(msg.chat.id, `Hi ${msg.chat.first_name}, you're now subscribed to daily weather report 🎉🎉`);
                }
            }
            else {
                this.bot.sendMessage(msg.chat.id, `Hi ${msg.chat.first_name}, it seems you're already subscribed 🏁`);
            }
        };
        this.unsubscribeUser = async (msg) => {
            const AllUsers = await this.getUsers();
            const user = AllUsers.find((user) => user.chatId === msg.chat.id);
            if (!user) {
                this.bot.sendMessage(msg.chat.id, `Hi ${msg.chat.first_name}, you're not subscribed to daily weather report yet Use /subscribe to receive daily updates 🌞🌚`);
            }
            else {
                const { error } = await supabase_1.default
                    .from('subscribed-users')
                    .delete()
                    .eq('chatId', msg.chat.id);
                this.bot.sendMessage(msg.chat.id, `Hi ${msg.chat.first_name}, you're now unsubscribed 😱🥶`);
            }
        };
        this.bot = new TelegramBot('6109532890:AAEMaFX0ytE253gyY_lkvlmqKTaBnNseoQg', { polling: true });
        this.bot.onText(/\/start/, this.replyToStartMsg);
        this.bot.onText(/\/subscribe/, this.subscribeUser);
        this.bot.onText(/\/unsubscribe/, this.unsubscribeUser);
        this.bot.on('message', this.replyToNormalText);
        this.cron_test = new cron.CronJob('0 */3 * * *', this.sendDailyWeatherUpdates);
        this.cron_test.start();
        this.bot.on('polling_error', console.log);
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map