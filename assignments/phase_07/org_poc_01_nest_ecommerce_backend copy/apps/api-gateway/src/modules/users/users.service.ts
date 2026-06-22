import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async getProfile(userId: string) {
    return await this.usersRepository.findById(userId);
  }

  async updateProfile(userId: string, data: { name?: string }) {
    return await this.usersRepository.updateProfile(userId, data);
  }
}
