import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@yw/api/auth/feature';
import { authConfiguration, shellConfiguration } from '@yw/api/shared';
import { UserModule } from '@yw/api/user/feature';
import { PgPrismaClientModule } from '@yw/pg-prisma-client';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PgPrismaClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [shellConfiguration,authConfiguration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
