import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

interface IOptions {
    port: number;
}

export async function getOptions(): Promise<IOptions> {
    const module = await NestFactory.create(AppModule);
    const configService = module.get(ConfigService);
    let port = 3000;
    const portStr =
        process.env.API_GATEWAY_PORT || configService.get('api_gateway.port');
    if (portStr) port = parseInt(portStr, 10);
    const options: IOptions = {
        port,
    };
    return options;
}

async function bootstrap() {
    const options = await getOptions();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(options.port);
}
bootstrap();
