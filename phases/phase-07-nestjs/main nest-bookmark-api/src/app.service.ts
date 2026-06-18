import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    const users = await this.prisma.user.findMany();

    return {
      message: 'Prisma Connected Successfully',
      users,
    };
  }
}
