import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { ProductStatus } from '../enums/product-status.enum';

export class Product {
  _id: Types.ObjectId;

  @prop()
  name: string;

  @prop({ type: Types.Decimal128 })
  price: number;

  @prop()
  stock: number;

  // TODO: Use ref to Category
  @prop({ type: Types.ObjectId })
  category: Types.ObjectId;

  @prop({ enum: ProductStatus })
  status: ProductStatus;

  @prop()
  image: string;
}
