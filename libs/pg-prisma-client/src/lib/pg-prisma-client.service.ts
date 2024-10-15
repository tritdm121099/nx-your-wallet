import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma-clients/pg-prisma';

@Injectable()
export class PgPrismaClientService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}
