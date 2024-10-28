import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService, TokenService } from './services';

@Global()
@Module({
  controllers: [],
  providers: [AuthService, TokenService],
  imports: [
    JwtModule.register({}),
  ],
  exports: [AuthService],
})
export class AuthServiceModule {}
