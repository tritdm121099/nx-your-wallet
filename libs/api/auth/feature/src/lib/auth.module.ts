import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceModule } from '@yw/api/auth/data-access';

@Module({
  controllers: [AuthController],
  imports: [AuthServiceModule],
  exports: [],
})
export class AuthModule {}
