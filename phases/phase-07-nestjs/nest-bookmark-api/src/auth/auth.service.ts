import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto.js';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  //SIGN UP
  async signup(dto: AuthDto) {
    this.logger.log(`Signup attempt for ${dto.email}`);

    const existingUser = await this.authRepository.findUserByEmail(dto.email);

    if (existingUser) {
      this.logger.warn(`Signup failed - Email already exists: ${dto.email}`);
      throw new ConflictException('Email already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.authRepository.createUser(dto.email, hash);

    this.logger.log(`User created successfully: ${user.email}`);

    //CURRENTLY DON'T WANT SHOW HASH PASSWORD(LATER WE CAN USED TRANSFORMER)

    return {
      message: 'User Created Successfully',
      id: user.id,
      email: user.email,
    };
  }

  //SIGN IN
  async signin(dto: AuthDto) {
    this.logger.log(`Signin attempt for ${dto.email}`);

    const user = await this.authRepository.findUserByEmail(dto.email);

    if (!user) {
      this.logger.warn(`Signin failed - User not found: ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      this.logger.warn(`Signin failed - Invalid password: ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User logged in successfully: ${user.email}`);

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  //GENERATE TOKEN(ACCESS & REFRESH)
  async generateTokens(userId: number, email: string) {
    this.logger.log(`Generating tokens for user ${userId}`);

    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //UPDATE REFRESH TOKEN
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);

    await this.authRepository.updateRefreshToken(userId, hash);
  }

  //REFRESH TOKEN
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.authRepository.findUserById(userId);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  //LOGOUT
  async logout(userId: number) {
    await this.authRepository.clearRefreshToken(userId);

    this.logger.log(`User ${userId} logged out`);

    return {
      message: 'Logged out successfully',
    };
  }
}
