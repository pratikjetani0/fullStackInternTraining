import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('user.created')
  handleUserCreated(@Payload() data: { userId: number; email: string }) {
    this.notificationService.sendWelcomeEmail(data.email);
  }

  @EventPattern('bookmark.created')
  handleBookmarkCreated(
    @Payload() data: { email: string; title: string; link: string },
  ) {
    this.notificationService.sendBookmarkCreatedEmail(
      data.email,
      data.title,
      data.link,
    );
  }
}
