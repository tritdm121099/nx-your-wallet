import { Module } from '@nestjs/common';
import { AuthServiceModule } from '@yw/api/auth/data-access';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies';
import { GoogleStrategy } from './strategies/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  controllers: [AuthController],
  imports: [AuthServiceModule],
  exports: [],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
