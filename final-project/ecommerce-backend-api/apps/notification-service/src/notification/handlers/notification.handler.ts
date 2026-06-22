import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { NotificationService } from '../notification.service.js';

import { NotificationType } from '../../../../../generated/prisma/client.js';

@Controller()
export class NotificationHandler {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('notification.created')
  async handleNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
  }) {
    console.log('EVENT RECEIVED =>', data);
    await this.notificationService.create(data);
  }
}
