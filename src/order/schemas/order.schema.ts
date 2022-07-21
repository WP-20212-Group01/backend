import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderProduct } from './order-product.schema';

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'orderDate',
    },
  },
})
export class Order {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  phone: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  address: string;

  @prop({ required: true, enum: OrderStatus })
  status: string;

  @prop()
  cancelReason: string;

  @prop()
  orderDate?: Date;

  @prop({ required: true, type: () => OrderProduct, _id: false })
  products: Types.Array<OrderProduct>;
}
