import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  updateUser(
    userId: number,
    data: {
      firstName?: string;
      lastName?: string;
    },
  ) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
}
