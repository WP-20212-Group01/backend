import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderProduct {
  @ApiProperty({ example: '62d794174298cccbd691d07f' })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
