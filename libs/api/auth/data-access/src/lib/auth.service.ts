import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/pg-prisma';
import { PgPrismaClientService } from '@yw/pg-prisma-client';

@Injectable()
export class AuthService {
  constructor(private prisma: PgPrismaClientService) {}

  user(params: Prisma.UserFindFirstArgs) {
    return this.prisma.user.findFirst(params);
  }

  createUser(params: Prisma.UserFindFirstArgs) {
    return params;
  }
}
