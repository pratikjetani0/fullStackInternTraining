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

  @ApiProperty({
    example:
      'https://www.google.com/imgres?q=product%20dummy%20image%20url&imgurl=x-raw-image%3A%2F%2F%2F574642c532f002e4f27d0688ff223351fb7fbe8d3dd6c6ebbd591885a2996031&imgrefurl=https%3A%2F%2Fpicsum.photos%2F&docid=KbxSwCHn8X-q5M&tbnid=5ALwMsVCRleWJM&vet=12ahUKEwiB04ux8JqVAxUgcmwGHXYIKlIQnPAOegQINhAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiB04ux8JqVAxUgcmwGHXYIKlIQnPAOegQINhAA',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
