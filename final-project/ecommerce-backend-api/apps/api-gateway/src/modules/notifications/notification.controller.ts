import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@ApiBearerAuth('JWT-auth')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('me')
  getMyNotifications(
    @CurrentUser('sub')
    userId: string,
  ) {
    return this.notificationsService.getMyNotifications(userId);
  }

  @Patch(':id/read')
  markAsRead(
    @Param('id')
    id: string,
  ) {
    return this.notificationsService.markAsRead(id);
  }
}
