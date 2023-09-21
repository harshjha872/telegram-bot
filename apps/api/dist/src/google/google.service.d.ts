export declare class GoogleService {
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
    };
}
