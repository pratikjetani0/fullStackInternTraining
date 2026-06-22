import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 16' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Latest Apple iPhone' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 99999 })
  @IsNumber()
  @Min(0)
  price!: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock!: number;
}
