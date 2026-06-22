import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'generated/prisma/enums.js';
import { JwtPayload } from './types/jwt-payload.type.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  //GENERATE ACCESS & REFRESH
  async generateTokens(userId: string, email: string, role: Role) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  //REGISTER
  async register(name: string, email: string, password: string) {
    const existingUser = await this.authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User alreay exists');
    }

    const hashPassword = await this.hashData(password);

    const user = await this.authRepository.createUser({
      name,
      email,
      password: hashPassword,
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    const hashRefreshToken = await this.hashData(tokens.refreshToken);

    await this.authRepository.updateRefreshToken(user.id, hashRefreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  //LOGIN
  async login(email: string, password: string) {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    const hashedRefreshToken = await this.hashData(tokens.refreshToken);

    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  //LOGOUT
  async logout(userId: string) {
    await this.authRepository.updateRefreshToken(userId, null);

    return {
      message: 'Logged out successfully',
    };
  }

  //REFERSH TOKEN
  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(
      refreshToken,
      {
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    const user = await this.authRepository.findUserById(payload.sub);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException();
    }

    const mathches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!mathches) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    const hashedRefreshToken = await this.hashData(tokens.refreshToken);

    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken: tokens.accessToken,
    };
  }
}
