import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@yw/api/auth/feature';
import { beConfigurations } from '@yw/api/shared';
import { UserModule } from '@yw/api/user/feature';
import { WalletModule } from '@yw/api/wallet';
import { PgPrismaClientModule } from '@yw/pg-prisma-client';

@Module({
  imports: [
    UserModule,
    AuthModule,
    WalletModule,
    PgPrismaClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: beConfigurations,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
