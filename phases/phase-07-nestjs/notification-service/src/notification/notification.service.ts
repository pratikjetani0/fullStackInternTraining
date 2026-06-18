import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  sendWelcomeEmail(email: string) {
    this.emailService.sendWelcomeEmail(email);
  }

  sendBookmarkCreatedEmail(email: string, title: string, link: string) {
    this.emailService.sendBookmarkCreatedEmail(email, title, link);
  }
}
