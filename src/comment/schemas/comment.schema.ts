import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export class Comment {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty({ type: String })
  @prop({ ref: () => Product, type: Types.ObjectId, index: true })
  product: Ref<Product>;

  @prop()
  name: string;

  @prop()
  comment: string;
}
