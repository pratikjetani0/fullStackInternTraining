import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  //FOR USER CREATED
  emitUserCreated(data: { userId: number; email: string }) {
    return this.client.emit('user.created', data);
  }

  //FOR BOOKMARK CREATED
  emitBookmarkCreated(data: { email: string; title: string; link: string }) {
    return this.client.emit('bookmark.created', data);
  }
}
