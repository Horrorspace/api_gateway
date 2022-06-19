import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            load: [configuration],
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
