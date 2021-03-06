import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { services } from '../services.enum';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: services.user,
                useFactory: async (configService: ConfigService) => {
                    const host =
                        process.env.RABBITMQ_HOST ||
                        configService.get('rabbitmq.host');
                    const protocol =
                        process.env.RABBITMQ_PROTOCOL ||
                        configService.get('rabbitmq.protocol');
                    const port =
                        process.env.RABBITMQ_PORT ||
                        configService.get('rabbitmq.port');
                    const user =
                        process.env.RABBITMQ_USER ||
                        configService.get('rabbitmq.user');
                    const password =
                        process.env.RABBITMQ_PASSWORD ||
                        configService.get('rabbitmq.password');
                    const durable =
                        process.env.RABBITMQ_DURABLE === 'true' ||
                        configService.get('rabbitmq.durable');
                    const queue =
                        process.env.USER_SERVICE_QUEUE ||
                        configService.get('user_service.queue');
                    const url = `${protocol}://${user}:${password}@${host}:${port}`;
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [url],
                            queue,
                            queueOptions: {
                                durable,
                            },
                        },
                    };
                },
            },
        ]),
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
