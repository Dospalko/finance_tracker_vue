import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsString()
    username!: string;
  
    @IsString()
    password!: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
