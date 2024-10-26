import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig, authConfiguration } from '@yw/api/shared';
import { AuthService } from './auth.service';

@Global()
@Module({
  controllers: [],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfiguration)],
      useFactory: async (authConfig: AuthConfig) => ({
        secret: authConfig.jwt.secretKey,
      }),
      inject: [authConfiguration.KEY],
    }),
  ],
  exports: [AuthService],
})
export class AuthServiceModule {}
