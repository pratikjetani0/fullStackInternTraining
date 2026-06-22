import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ name: 'Pratik Jetani' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}
