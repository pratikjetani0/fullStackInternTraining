import { Module } from '@nestjs/common';

import { NotificationService } from './notification.service.js';
import { NotificationRepository } from './repositories/notification.repository.js';
import { NotificationHandler } from './handlers/notification.handler.js';
import { EmailModule } from '../email/email.module.js';

@Module({
  imports: [EmailModule],
  controllers: [NotificationHandler],
  providers: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
