import { Type } from 'class-transformer';
import { IsInt, IsMongoId, IsNotEmpty, IsPositive } from 'class-validator';

export class GetCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}
