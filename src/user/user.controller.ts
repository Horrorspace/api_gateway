import { Controller, Get, Post, Delete, Body, Inject, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';
import { GetUserByLoginDto } from './dto/get-user-by-login.dto';
import { UserService } from './user.service';

@Controller('user')

export class UserController {
    constructor(@Inject(UserService) private readonly userService: UserService) {}

    @Get('getUserByEmail')
    async getUserByEmail(@Body() { email }: GetUserByEmailDto) {
        return await this.userService.getUserByEmail(email);
    }

    @Get('getUserByLogin')
    async getUserByLogin(@Body() { login }: GetUserByLoginDto) {
        return await this.userService.getUserByLogin(login);
    }

    @Post('register')
    async register(@Body() userToCreate: CreateUserDto) {
        return await this.userService.createUserByEmail(userToCreate);
    }

    @Delete('delete')
    async delete(@Body() { login }: GetUserByLoginDto) {
        return await this.userService.deleteUserByLogin(login);
    }
}
