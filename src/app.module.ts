import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HomeModule } from 'src/home/home.module';

const allModules = [AuthModule, HomeModule];
@Module({
  imports: [...allModules,
]
})
export class AppModule {}
