import { Controller, Get, Post, Body, UseGuards, SetMetadata, Param } from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth.service';
import { RegisterAuthView } from 'src/shared/view-models/auth/register-auth.view';
import { LoginAuthView } from 'src/shared/view-models/auth/login-auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { GetAllUsersAuthView } from 'src/shared/view-models/auth/get-all-user-auth.view';
import { ResetPasswordAuthView } from 'src/shared/view-models/auth/reset-password-auth';
import { GetResetPasswordAuthView } from 'src/shared/view-models/auth/get-reset-password-auth';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
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
    async getAllUsers(): Promise<GetAllUsersAuthView> {
        const response = await this.authService.getAllUsers();
        return response;
    }

    @Post('/register')
    async register(@Body() registerViewModel: RegisterAuthView): Promise<void> {
        await this.authService.register(registerViewModel);
    }

    @Post('/login')
    async login(@Body() loginAuthView: LoginAuthView): Promise<ResponseLoginAuthView> {
        return await this.authService.login(loginAuthView);
    }

    @Get('/resetPassword/:id')
    async getResetPassword(@Param() params): Promise<GetResetPasswordAuthView> {
        return await this.authService.getResetPasssword(params.id);
    }

    @Post('/resetPassword')
    async resetPassword(@Body() resetPasswordAuthView: ResetPasswordAuthView): Promise<void> {
        await this.authService.resetPassword(resetPasswordAuthView);
    }

}