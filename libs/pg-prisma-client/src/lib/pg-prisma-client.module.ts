import { Global, Module } from '@nestjs/common';
import { PgPrismaClientService } from './pg-prisma-client.service';

@Global()
@Module({
  providers: [PgPrismaClientService],
  exports: [PgPrismaClientService],
})
export class PgPrismaClientModule {}
