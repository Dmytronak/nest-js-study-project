import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/shared/providers/database.provider';
import { userProviders } from 'src/shared/providers/auth/user-model.provider';
import { JwtStrategy } from 'src/shared/configs/jwt-strategy.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/shared/services/auth.service';
import { jwtDynamicModule } from 'src/shared/dynamic-modules/jwt-dynaic.module';

const providers = [...databaseProvider, ...userProviders];
const services = [AuthService];
@Module({
    imports:[
        ConfigModule.forRoot({ isGlobal: true}),
        PassportModule,
        jwtDynamicModule
    ],
    providers: [
        AuthService,
        JwtStrategy,
        ...providers,
    ],
    exports: [...providers, ...services],
})

export class SharedModule {}