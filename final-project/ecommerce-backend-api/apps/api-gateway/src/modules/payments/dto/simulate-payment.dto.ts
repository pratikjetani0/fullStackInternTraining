import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SimulatePaymentDto {
  @ApiProperty({ example: 'order-uuid' })
  @IsString()
  orderId!: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  success?: boolean;
}
