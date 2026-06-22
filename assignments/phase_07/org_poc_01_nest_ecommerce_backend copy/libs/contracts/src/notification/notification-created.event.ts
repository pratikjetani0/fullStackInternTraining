import { NotificationType } from '../../../../generated/prisma/client.js';

export interface NotificationCreatedEvent {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}
