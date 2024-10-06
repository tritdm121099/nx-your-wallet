import { Module } from '@nestjs/common';
import { PgPrismaClientService } from './pg-prisma-client.service';

@Module({
  providers: [PgPrismaClientService],
  exports: [PgPrismaClientService],
})
export class PgPrismaClientModule {}
