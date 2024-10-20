import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/pg-prisma';
import { PgPrismaClientService } from '@yw/pg-prisma-client';

@Injectable()
export class UserService {
  constructor(private prisma: PgPrismaClientService) {}

  getUser(args: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }

  createUser(args: Prisma.UserCreateArgs) {
    return this.prisma.user.create(args);
  }
}
