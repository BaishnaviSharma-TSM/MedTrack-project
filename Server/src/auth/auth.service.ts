import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenEntity, UserEntity } from '../database/entities';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  async refresh(dto: RefreshTokenDto) {
    const stored = await this.refreshTokenRepository.findOne({
      where: { token: dto.refreshToken },
      relations: ['user', 'user.clinic'],
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.refreshTokenRepository.delete({ id: stored.id });

    return this.buildAuthResponse(stored.user);
  }

  async logout(dto: RefreshTokenDto) {
    await this.refreshTokenRepository.delete({ token: dto.refreshToken });

    return {
      message: 'Logout successful',
      data: null,
    };
  }

  async me(user: JwtPayload) {
    return {
      message: 'Session retrieved successfully',
      data: {
        id: user.sub,
        email: user.email,
        role: user.role,
        clinicId: user.clinicId,
        staffCode: user.staffCode,
      },
    };
  }

  private async buildAuthResponse(user: UserEntity) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      clinicId: user.clinicId,
      staffCode: user.staffCode,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = randomBytes(48).toString('hex');
    const refreshExpires = this.configService.get<string>('jwt.refreshExpires')!;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.parseDays(refreshExpires));

    await this.refreshTokenRepository.save(
      this.refreshTokenRepository.create({
        userId: user.id,
        token: refreshToken,
        expiresAt,
      }),
    );

    return {
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.fullName,
          clinicId: user.clinicId,
          staffCode: user.staffCode,
          role: user.role,
        },
      },
    };
  }

  private parseDays(value: string) {
    if (value.endsWith('d')) {
      return parseInt(value.replace('d', ''), 10);
    }

    return 7;
  }
}
