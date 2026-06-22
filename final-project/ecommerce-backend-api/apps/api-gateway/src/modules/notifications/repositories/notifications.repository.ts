import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../../../../../libs/database/src/database.service.js';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findByUserId(userId: string) {
    return this.databaseService.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  markAsRead(id: string) {
    return this.databaseService.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }
}
