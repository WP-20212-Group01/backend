import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
import { ProductStatus } from '../enums/product-status.enum';

export class Product {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @prop()
  name: string;

  @prop({ type: Types.Decimal128 })
  price: number;

  @prop()
  stock: number;

  // TODO: Use ref to Category
  @prop({ ref: () => Category, type: Types.ObjectId })
  category: Ref<Category, Types.ObjectId>;

  @prop({ enum: ProductStatus })
  status: ProductStatus;

  @prop()
  image: string;
}
