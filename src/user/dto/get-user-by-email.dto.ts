import { IsEmail } from 'class-validator';

export class GetUserByEmailDto {
    @IsEmail()
    public readonly email: string;
}
