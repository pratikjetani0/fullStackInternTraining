import { IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
