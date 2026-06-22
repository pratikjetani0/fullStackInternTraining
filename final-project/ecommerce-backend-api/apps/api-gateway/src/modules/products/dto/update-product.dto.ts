import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, IsInt } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'iPhone 16' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Latest Apple iPhone' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 99999 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
