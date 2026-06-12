import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/auth.dto.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';
import { JwtGuard } from './guards/jwt.guard.js';
import { GetUser } from './decorators/get-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  refreshTokens(
    @GetUser('id') userId: number,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  logout(@GetUser('id') userId: number) {
    return this.authService.logout(userId);
  }
}
