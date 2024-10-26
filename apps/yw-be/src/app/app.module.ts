import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@yw/api/auth/feature';
import { UserModule } from '@yw/api/user/feature';
import { PgPrismaClientModule } from '@yw/pg-prisma-client';
import { authConfiguration } from '@yw/api/shared';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PgPrismaClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfiguration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
