import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/shared/providers/database.provider';
import { JwtStrategy } from 'src/shared/configs/jwt-strategy.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/shared/services/auth.service';
import { jwtDynamicModule } from 'src/shared/modules/jwt-dynamic.module';
import { authProviders } from 'src/shared/providers/auth/auth.provider';
import { AdminService } from './services/admin/admin.service';
import { adminProviders } from './providers/admin/admin.provider';

const providers = [...databaseProvider, ...authProviders, ...adminProviders];
const services = [AuthService, AdminService];

@Module({
    imports:[
        ConfigModule.forRoot({ isGlobal: true}),
        PassportModule,
        jwtDynamicModule
    ],
    providers: [
        JwtStrategy,
        ...services,
        ...providers,
    ],
    exports: [...providers, ...services],
})

export class SharedModule {}