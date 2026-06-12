import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller.js';
import { BookmarkService } from './bookmark.service.js';
import { BookmarkRepository } from './bookmark.repository.js';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
