import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HomeModule } from 'src/home/home.module';
import { AdminModule } from './admin/admin.module';

const allModules = [AuthModule, HomeModule];
@Module({
  imports: [...allModules, AdminModule,
]
})
export class AppModule {}
