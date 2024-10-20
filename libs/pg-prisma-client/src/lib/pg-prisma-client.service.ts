import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/pg-prisma-clients';

@Injectable()
export class PgPrismaClientService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}
