import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductFilterDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsOptional()
  limit = 12;

  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsOptional()
  categories?: string[];
}
