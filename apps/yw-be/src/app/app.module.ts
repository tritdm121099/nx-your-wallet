import { Module } from '@nestjs/common';

import { AuthModule } from '@yw/api/auth/feature';
import { UserModule } from '@yw/api/user/feature';
import { PgPrismaClientModule } from '@yw/pg-prisma-client';

@Module({
  imports: [AuthModule, UserModule, PgPrismaClientModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {}
