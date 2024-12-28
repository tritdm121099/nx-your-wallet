import { Module } from '@nestjs/common';
import { UserServiceModule } from '@yw/api/user/data-access';

@Module({
  controllers: [],
  imports: [UserServiceModule],
  exports: [],
})
export class UserModule {}
