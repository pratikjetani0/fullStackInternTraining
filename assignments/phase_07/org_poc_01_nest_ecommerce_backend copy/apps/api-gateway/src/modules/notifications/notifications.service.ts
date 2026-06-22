import { NotificationCreatedEvent } from '../../../../../libs/contracts/src/index.js';
import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { NotificationsRepository } from './repositories/notifications.repository.js';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly client: ClientProxy,
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  sendNotification(data: NotificationCreatedEvent) {
    console.log('EMITTING EVENT =>', data);

    return this.client.emit('notification.created', data);
  }

  getMyNotifications(userId: string) {
    return this.notificationsRepository.findByUserId(userId);
  }

  markAsRead(id: string) {
    return this.notificationsRepository.markAsRead(id);
  }
}
