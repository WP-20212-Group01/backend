import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class GetOrderDto {
  @ApiPropertyOptional({ type: () => Number, default: 1 })
  @IsPositive()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @ApiPropertyOptional({ type: () => Number, default: 12 })
  @IsPositive()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit = 12;
}
