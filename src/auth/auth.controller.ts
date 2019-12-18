import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/entities/auth/user-auth.entity';
import { RegisterAuthView } from 'src/shared/view-models/auth/register-auth.view';
import { LoginAuthView } from 'src/shared/view-models/auth/login-auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get()
    getAuth(): string {
        return this.authService.getLogin();
    }

    @Get('/login')
    getLogin(): string {
        return this.authService.getLogin();
    }

    @Get('/register')
    getRegister(): string {
        return this.authService.getRegister();
    }

    @Get('/allUsers')
    async getAllUsers(): Promise<User[]> {
       const response = await this.authService.getAllUsers();
       return response;
    }

    @Post('/register')
    async register(@Body() registerViewModel:RegisterAuthView) : Promise<void> {
        await this.authService.register(registerViewModel);
    }

    @Post('/login')
    async login(@Body() loginAuthView:LoginAuthView) : Promise<ResponseLoginAuthView> {
       return await this.authService.login(loginAuthView);
    }

}