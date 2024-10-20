import { Module } from '@nestjs/common';
import { AuthServiceModule } from '@yw/api/auth/data-access';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    AuthServiceModule,
  ],
  exports: [],
  providers: [GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
