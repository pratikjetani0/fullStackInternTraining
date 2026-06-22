import { Module } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';
import { AdminRepository } from './repositories/admin.repository.js';

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
})
export class AdminModule {}
