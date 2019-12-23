import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { passwordHashHelper } from 'src/shared/helpers/password-hash.helper';
import { RegisterAuthView } from 'src/shared/view-models/auth/register-auth.view';
import { LoginAuthView } from 'src/shared/view-models/auth/login-auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ResponseValidationAuthView } from '../view-models/auth/response-validation-auth.view';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>, private readonly jwtService: JwtService) { }

    getLogin(): string {
        return 'AUTH LOGIN!';
    }

    getRegister(): string {
        return 'AUTH Register!';
    }

    async validateUser(userId:string): Promise<any>{
        const user: User = await this.userRepository.findOne(userId);
        if (user) {
            const { hash,salt,...result } = user;
            return result;
          }
          return null;
        
    }


    async register(register: RegisterAuthView): Promise<void> {
        const isExistEmail  = await this.userRepository.findOne({email:register.email});
        if(isExistEmail){
            throw new HttpException({ error: `Email ${register.email} is already taken`}, 403);
        }

        const credential = passwordHashHelper(register.password,'');
        const user: User = new User();
        user.email = register.email;
        user.firstName=register.firstName;
        user.lastName=register.lastName;
        user.fullName = `${register.firstName} ${register.lastName}`;
        user.hash = credential.hashPassword;
        user.salt = credential.salt;
        user.age = register.age;

        await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        const response = await this.userRepository.find();
        return response;
    }

    async login(login: LoginAuthView) : Promise<ResponseLoginAuthView> {
        const response:ResponseLoginAuthView = {access_token:''};
        const user = await this.userRepository.findOne({email:login.email});
        const credential = passwordHashHelper(login.password,user.salt);
        if(user && credential.hashPassword === user.hash){
            const payload = { sub: user._id, email: user.email};
            await this.jwtService.signAsync(payload)
            .then(x=>{response.access_token = x});
        }
        return response;
    }
}
