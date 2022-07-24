import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ description: 'Category slug' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;

  @IsString()
  @IsNotEmpty()
  image: string;
}
