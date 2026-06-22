import { DatabaseService } from '../../../../../../libs/database/src/index.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //FIND USER BY EMAIL
  findUserByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  //FIND USER BY ID
  findUserById(userId: string) {
    return this.databaseService.user.findUnique({
      where: { id: userId },
    });
  }

  //CREATE USER
  createUser(data: { name: string; email: string; password: string }) {
    return this.databaseService.user.create({
      data,
    });
  }

  //UPDATE REFRESH TOKEN
  updateRefreshToken(userId: string, hashedRefreshToken: string | null) {
    return this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }
}
