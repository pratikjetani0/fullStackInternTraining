import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../libs/database/src/index.js';
import { NotificationModule } from './notification/notification.module.js';

@Module({
  imports: [DatabaseModule, NotificationModule],
})
export class AppModule {}
