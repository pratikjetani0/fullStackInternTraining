import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateBookmarkDto } from './dto/create-bookmark.dto.js';
import { EditBookmarkDto } from './dto/edit-bookmark.dto.js';

@Injectable()
export class BookmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  //CREATE BOOKMARK
  createBookmark(userId: number, dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  //FIND BOOKMARK BY USER ID
  findBookmarksByUserId(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //FIND BOOKMARK BY ID
  findBookmarkById(bookmarkId: number) {
    return this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
  }
  //FIND BOOKMARK FOR USER WHICH IS FIRST
  findBookmarkByUserId(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  //UPDATE BOOKMARK
  updateBookmark(bookmarkId: number, dto: EditBookmarkDto) {
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: dto,
    });
  }

  //DELETE BOOKMARK
  deleteBookmark(bookmarkId: number) {
    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }

  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
