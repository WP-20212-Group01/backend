import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
