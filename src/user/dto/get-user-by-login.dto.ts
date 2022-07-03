import { IsString } from 'class-validator';

export class GetUserByLoginDto {
    @IsString()
    public readonly login: string;
}
