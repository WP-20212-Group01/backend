import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export class OrderProduct {
  @ApiProperty({ type: String })
  @prop({ ref: () => Product, type: Types.ObjectId })
  product: Ref<Product>;

  @prop()
  quantity: number;
}
