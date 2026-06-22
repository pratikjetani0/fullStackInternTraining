import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { orderConfirmationTemplate } from './templates/order-confirmation.template.ts.js';
import { paymentSuccessTemplate } from './templates/payment-success.template.ts.js';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  //EMAIl FOR ORDER
  async sendOrderConfirmationEmail(email: string, customerName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '🎉 Order Confirmed',
      html: orderConfirmationTemplate(customerName),
    });
  }

  //EMAIL FOR PAYMENT
  async sendPaymentSuccessEmail(email: string, customerName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '✅ Payment Successful',
      html: paymentSuccessTemplate(customerName),
    });
  }
}
