import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../../../libs/database/src/index.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //FIND BY EMAIL
  async findByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: { email },
    });
  }

  //FIND BY ID
  async findById(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  //UPDATE PROFILE
  async updateProfile(userId: string, data: { name?: string }) {
    return await this.databaseService.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
