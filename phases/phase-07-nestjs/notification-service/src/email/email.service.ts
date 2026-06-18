import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { welcomeEmailTemplate } from './templates/bookmark-created-email';
import { bookmarkCreatedEmailTemplate } from './templates/welcome-email';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  //SEND WELCOME MAIL
  async sendWelcomeEmail(email: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: email,

        subject: 'Welcome to Bookmark API',

        html: welcomeEmailTemplate(email),
      });

      this.logger.log(`Email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email`, error);
    }
  }

  //BOOKMARK EMAIL
  async sendBookmarkCreatedEmail(email: string, title: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: 'Bookmark Created 🔖',

      html: bookmarkCreatedEmailTemplate(title, link),
    });
  }
}
