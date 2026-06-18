import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto.js';
import { EditBookmarkDto } from './dto/edit-bookmark.dto.js';
import { BookmarkRepository } from './bookmark.repository.js';
import { Bookmark } from '../../generated/prisma/client.js';
import { NotificationService } from '../notification/notification.service.js';

@Injectable()
export class BookmarkService {
  private readonly logger = new Logger(BookmarkService.name);

  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    this.logger.log(`User ${userId} is creating a bookmark`);

    const bookmark = await this.bookmarkRepository.createBookmark(userId, dto);
    const user = await this.bookmarkRepository.findUserById(userId);

    if (user) {
      this.notificationService.emitBookmarkCreated({
        email: user.email,
        title: dto.title,
        link: dto.link,
      });
    }

    this.logger.log(`Bookmark ${bookmark.id} created by user ${userId}`);

    return bookmark;
  }

  async getBookmarks(userId: number) {
    this.logger.log(`User ${userId} fetched all bookmarks`);
    return await this.bookmarkRepository.findBookmarksByUserId(userId);
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    this.logger.log(`User ${userId} fetched bookmark ${bookmarkId}`);
    return await this.bookmarkRepository.findBookmarkByUserId(
      userId,
      bookmarkId,
    );
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark: Bookmark | null =
      await this.bookmarkRepository.findBookmarkById(bookmarkId);

    if (!bookmark) {
      this.logger.warn(`Bookmark ${bookmarkId} not found`);
      throw new ForbiddenException('Bookmark not found');
    }

    if (bookmark.userId !== userId) {
      this.logger.warn(
        `User ${userId} attempted unauthorized update on bookmark ${bookmarkId}`,
      );
      throw new ForbiddenException('Access denied');
    }

    const updatedBookmark = await this.bookmarkRepository.updateBookmark(
      bookmarkId,
      dto,
    );

    this.logger.log(`Bookmark ${bookmarkId} updated by user ${userId}`);

    return updatedBookmark;
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark: Bookmark | null =
      await this.bookmarkRepository.findBookmarkById(bookmarkId);

    if (!bookmark) {
      this.logger.warn(`Bookmark ${bookmarkId} not found`);
      throw new ForbiddenException('Bookmark not found');
    }

    if (bookmark.userId !== userId) {
      this.logger.warn(
        `User ${userId} attempted unauthorized delete on bookmark ${bookmarkId}`,
      );
      throw new ForbiddenException('Access denied');
    }

    await this.bookmarkRepository.deleteBookmark(bookmarkId);

    this.logger.log(`Bookmark ${bookmarkId} deleted by user ${userId}`);

    return {
      message: 'Bookmark deleted successfully',
    };
  }
}
