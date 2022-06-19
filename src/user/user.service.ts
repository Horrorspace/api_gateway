import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { services } from '../services.enum';
import { IUserRes } from './interfaces/IUserRes';
import { userCmd } from './interfaces/userCmd';
import { userCmds } from './enums/userCmds.enum';
import { IAnyRes } from './interfaces/IAnyRes';
import { codes } from './enums/codes.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { IRes } from './interfaces/IRes';

@Injectable()
export class UserService {
    constructor(
        @Inject(services.user) private readonly user: ClientProxy,
    ) {}

    private send<T, R extends IAnyRes>(cmd: userCmd, payload: T): Promise<R> {
        return new Promise(
            (resolve, reject) => {
                this.user.send<R>(cmd, payload)
                    .pipe(
                        map(
                            data => {
                                if (data.status === 'error') {
                                    const {message} = data;
                                    if (typeof message !== 'string') throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
                                    else if (message === codes.badRequest) throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
                                    else if (message === codes.notFound) throw new HttpException('not found', HttpStatus.NOT_FOUND);
                                    else throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
                                }
                                else return data;
                            }
                        )
                    )
                    .subscribe({
                        next: (data) => resolve(data),
                        error: e => {throw e}
                    });
            }
        );
    }

    public async getUserByEmail(email: string): Promise<IUserRes> {
        return await this.send<string, IUserRes>(userCmds.getUserByEmail, email);
    }

    public async getUserByLogin(login: string): Promise<IUserRes> {
        return await this.send<string, IUserRes>(userCmds.getUserByLogin, login);
    }

    public async createUserByEmail(userToCreate: CreateUserDto): Promise<IUserRes> {
        return await this.send<CreateUserDto, IUserRes>(userCmds.createUserByEmail, userToCreate);
    }

    public async deleteUserByLogin(login: string): Promise<IRes> {
        return await this.send<string, IRes>(userCmds.deleteUserByLogin, login);
    }
}
