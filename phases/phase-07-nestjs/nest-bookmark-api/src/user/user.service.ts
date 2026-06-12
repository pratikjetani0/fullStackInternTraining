import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserRepository } from './user.repository.js';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  //GET CURRENT USER
  async getMe(userId: number) {
    this.logger.log(`User ${userId} fetched profile`);
    return await this.userRepository.findUserById(userId);
  }

  //UPDATE USER
  async updateUser(userId: number, dto: UpdateUserDto) {
    this.logger.log(`User ${userId} is updating profile`);
    return await this.userRepository.updateUser(userId, dto);
  }
}
