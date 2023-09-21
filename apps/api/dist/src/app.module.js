"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const telegram_module_1 = require("./telegram/telegram.module");
const login_google_1 = require("./google/login.google");
const google_controller_1 = require("./google/google.controller");
const google_service_1 = require("./google/google.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../..', 'client', 'dist'),
            }),
            telegram_module_1.TelegramModule,
        ],
        controllers: [app_controller_1.AppController, google_controller_1.GoogleController],
        providers: [app_service_1.AppService, login_google_1.GoogleStrategy, google_service_1.GoogleService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map