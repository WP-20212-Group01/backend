import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
import { ProductStatus } from '../enums/product-status.enum';

export class Product {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  stock: number;

  // TODO: Use ref to Category
  @prop({ required: true, ref: () => Category, type: Types.ObjectId })
  category: Ref<Category, Types.ObjectId>;

  @prop({ required: true, enum: ProductStatus })
  status: ProductStatus;

  @prop({ required: true })
  image: string;
}
