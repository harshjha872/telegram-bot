import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getUsers(): Promise<any[]>;
    deleteUser(chatIdObj: any): Promise<string>;
}
