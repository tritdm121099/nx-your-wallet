import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';

@Global()
@Module({
  controllers: [],
  providers: [UserService],
  exports: [],
})
export class UserServiceModule {}
