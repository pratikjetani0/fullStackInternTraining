import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller.js';
import { BookmarkService } from './bookmark.service.js';
import { BookmarkRepository } from './bookmark.repository.js';
import { NotificationModule } from '../notification/notification.module.js';

@Module({
  imports: [NotificationModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
