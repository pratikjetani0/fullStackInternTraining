import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from '../auth.repository.js';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authRepository: AuthRepository,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),

      secretOrKey: config.get<string>('JWT_SECRET') ?? '',

      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: {
      sub: number;
      email: string;
    },
  ) {
    const refreshToken = (req.body as { refreshToken: string }).refreshToken;

    const user = await this.authRepository.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      refreshToken,
    };
  }
}
