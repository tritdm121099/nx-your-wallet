import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthServiceModule {}
