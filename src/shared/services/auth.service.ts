import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { passwordHashHelper } from 'src/shared/helpers/password-hash.helper';
import { RegisterAuthView } from 'src/shared/view-models/auth/register-auth.view';
import { LoginAuthView } from 'src/shared/view-models/auth/login-auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { JwtService } from '@nestjs/jwt';
import { Repository, ObjectID } from 'typeorm';
import { PayloadAuthView } from 'src/shared/view-models/auth/payload.auth.view';
import { GetAllUsersAuthView, UserGetAllUsersAuthViewItem } from 'src/shared/view-models/auth/get-all-user-auth.view';
import { ResetPasswordAuthView } from 'src/shared/view-models/auth/reset-password-auth';
import { GetResetPasswordAuthView } from 'src/shared/view-models/auth/get-reset-password-auth';
import { Role } from 'src/shared/entities/role.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>,
        @Inject('ROLES_REPOSITORY') private readonly rolesRepository: Repository<Role>,
        private readonly jwtService: JwtService) { }

    getLogin(): string {
        return 'AUTH LOGIN!';
    }

    getRegister(): string {
        return 'AUTH Register!';
    }

    public async validate(userId: ObjectID): Promise<any> {
        const user: User = await this.userRepository.findOne(userId);
        if (user) {
            const { hash, salt, ...result } = user;
            return result;
        }
        return null;

    }

    public async register(register: RegisterAuthView): Promise<void> {
        const isExistEmail = await this.userRepository.findOne({ email: register.email });
        if (isExistEmail) {
            throw new HttpException({ error: `Email ${register.email} is already taken` }, 403);
        }
        const role: Role = await this.rolesRepository.findOne(process.env.USER_ROLE_ID)

        if (!role) {
            throw new HttpException({ error: `Role USER didn't find` }, 403);
        }

        const credential = passwordHashHelper(register.password, null);
        const user: User = new User();
        user.email = register.email;
        user.firstName = register.firstName;
        user.lastName = register.lastName;
        user.fullName = `${register.firstName} ${register.lastName}`;
        user.hash = credential.hashPassword;
        user.salt = credential.salt;
        user.age = register.age;
        user.roles = [role];

        await this.userRepository.save(user);
    }

    public async getAllUsers(): Promise<GetAllUsersAuthView> {
        const response: GetAllUsersAuthView = new GetAllUsersAuthView();
        await this.userRepository
            .find()
            .then(result => {
                result.map(x => {
                    const user: UserGetAllUsersAuthViewItem = {
                        email: x.email
                    };
                    response.allUsers.push(user);
                })
            });

        return response;
    }

    public async login(login: LoginAuthView): Promise<ResponseLoginAuthView> {
        const response: ResponseLoginAuthView = { access_token: '' };
        const user = await this.userRepository.findOne({ email: login.email });
        const credential = passwordHashHelper(login.password, user.salt);
        let payload: PayloadAuthView = {
            sub: user._id,
            email: user.email,
            roles: user.roles
                .map(x => x.name)
        };

        if (user && credential.hashPassword === user.hash) {
            await this.jwtService.signAsync(payload)
                .then(x => {
                    response.access_token = x
                });
        }

        return response;
    }

    public async getResetPasssword(id: string): Promise<GetResetPasswordAuthView> {
        const response: GetResetPasswordAuthView = await this.userRepository
            .findOne(id)
            .then(x => {
                const result: GetResetPasswordAuthView = { id: x._id, fullName: x.fullName, email: x.email };
                return result;
            })

        return response;
    }

    public async resetPassword(resetPasswordAuthView: ResetPasswordAuthView): Promise<void> {
        const user: User = await this.userRepository.findOne(resetPasswordAuthView.id);
        if (!user) {
            throw new HttpException({ error: `User ${resetPasswordAuthView.id} is not foudnd` }, 403);
        }
        const credentials = passwordHashHelper(resetPasswordAuthView.password, user.salt);
        user.hash = credentials.hashPassword;

        if (user.hash === user.oldHash) {
            throw new HttpException({ error: `Your password ${resetPasswordAuthView.password} is not valid, you can't use old password` }, 403);
        }

        await this.userRepository.update({ _id: user._id }, user);
    }
}
