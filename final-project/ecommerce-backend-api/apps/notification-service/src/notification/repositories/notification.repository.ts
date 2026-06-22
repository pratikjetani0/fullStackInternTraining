import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../../../../libs/database/src/index.js';

import { NotificationType } from '../../../../../generated/prisma/client.js';

@Injectable()
export class NotificationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //CREATE NOTIFICTION
  create(data: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
  }) {
    return this.databaseService.notification.create({
      data,
    });
  }

  //FIND USER EMAIL
  findUserEmail(userId: string) {
    return this.databaseService.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
      },
    });
  }
}
