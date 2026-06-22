import { IsEnum, IsString } from 'class-validator';

import { NotificationType } from '../../../../../../generated/prisma/client.js';

export class CreateNotificationDto {
  @IsString()
  userId!: string;

  @IsString()
  title!: string;

  @IsString()
  message!: string;

  @IsEnum(NotificationType)
  type!: NotificationType;
}
