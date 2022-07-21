import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(Order) private readonly orderModel: ReturnModelType<typeof Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderModel.create({
      ...createOrderDto,
      status: OrderStatus.PENDING,
    });
  }
}
