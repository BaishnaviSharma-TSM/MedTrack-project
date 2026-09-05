import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'doctor@medtrack.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MedTrack@123' })
  @IsString()
  @MinLength(6)
  password: string;
}
