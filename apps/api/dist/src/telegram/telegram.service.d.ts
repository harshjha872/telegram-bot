export declare class TelegramService {
    private readonly bot;
    private cron_test;
    constructor();
    sendDailyWeatherUpdates: () => Promise<void>;
    sendWelcomeMessage: (chatId: number) => void;
    replyToNormalText: (msg: any) => void;
    replyToStartMsg: (msg: any) => void;
    getUsers: () => Promise<any[]>;
    subscribeUser: (msg: any) => Promise<void>;
    unsubscribeUser: (msg: any) => Promise<void>;
}
