import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './repositories/notification.repository.js';
import { NotificationType } from '../../../../generated/prisma/enums.js';
import { EmailService } from '../email/email.service.js';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(data: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
  }) {
    const notification = await this.notificationRepository.create(data);

    const user = await this.notificationRepository.findUserEmail(data.userId);

    if (!user) {
      return;
    }

    switch (data.type) {
      case NotificationType.ORDER:
        await this.emailService.sendOrderConfirmationEmail(
          user.email,
          user.name,
        );
        break;

      case NotificationType.PAYMENT:
        await this.emailService.sendPaymentSuccessEmail(user.email, user.name);
        break;
    }

    return notification;
  }
}
