export declare class AppService {
    getHello(): string;
    getAllUsers(): Promise<any[]>;
    deleteUser(id: number): Promise<string>;
}
