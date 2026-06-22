import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { NotificationsService } from './notifications.service.js';
import { NotificationsRepository } from './repositories/notifications.repository.js';
import { NotificationsController } from './notification.controller.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
  ],
  providers: [NotificationsService, NotificationsRepository],
  exports: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
