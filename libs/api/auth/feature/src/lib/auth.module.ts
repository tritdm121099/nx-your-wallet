import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceModule } from '@yw/api/auth/data-access';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies';
import { Auth0Controller } from './auth0.controller';

@Module({
  controllers: [AuthController, Auth0Controller],
  imports: [
    AuthServiceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [],
  providers: [GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
