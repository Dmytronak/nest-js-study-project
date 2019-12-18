import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/shared/entities/auth/user-auth.entity';
import { passwordHashHelper } from 'src/shared/helpers/password-hash.helper';
import { RegisterAuthView } from 'src/shared/view-models/auth/register-auth.view';
import { LoginAuthView } from 'src/shared/view-models/auth/login-auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>, private readonly jwtService: JwtService) { }

    getLogin(): string {
        return 'AUTH LOGIN!';
    }

    getRegister(): string {
        return 'AUTH Register!';
    }

    async register(register: RegisterAuthView): Promise<void> {
        const isExistEmail  = await this.userModel.findOne({email:register.email}).select('-hash -salt');
        if(isExistEmail){
            throw new HttpException({ error: `Email ${register.email} is already taken`}, 403);
        }

        const credential = passwordHashHelper(register.password,'');
        const user = new this.userModel(register);
        user.fullName = `${register.firstName} ${register.lastName}`;
        user.hash = credential.hashPassword;
        user.salt = credential.salt;

        await user.save();
    }

    async getAllUsers(): Promise<User[]> {
        const response = await this.userModel.find().select('-hash -salt');
        return response;
    }

    async login(login: LoginAuthView) : Promise<ResponseLoginAuthView> {
        const response:ResponseLoginAuthView = {access_token:''};
        const user = await this.userModel.findOne({email:login.email});
        const credential = passwordHashHelper(login.password,user.salt);
        if(user && credential.hashPassword === user.hash){
            const payload = { sub: user.id, email: user.email};
            await this.jwtService.signAsync(payload)
            .then(x=>{response.access_token = x});
        }
        return response;
    }
}
