import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/pg-prisma';

@Injectable()
export class PgPrismaClientService extends PrismaClient {}
