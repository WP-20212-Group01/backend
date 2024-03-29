import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CreateOrderDto } from './dtos/create-order.dto';
import { GetOrderDto } from './dtos/get-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { OrderProduct } from './schemas/order-product.schema';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(Order) private readonly orderModel: ReturnModelType<typeof Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderProducts = createOrderDto.products.map<OrderProduct>(
      (product) => ({
        product: new Types.ObjectId(product.productId),
        quantity: product.quantity,
      }),
    );

    return this.orderModel.create({
      ...createOrderDto,
      status: OrderStatus.PENDING,
      products: orderProducts,
    });
  }

  async getOrders(getOrderDto: GetOrderDto): Promise<Order[]> {
    const { page, limit } = getOrderDto;
    return this.orderModel
      .find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: {
            name: 1,
            price: 1,
            image: 1,
          },
        },
      })
      .limit(limit)
      .exec();
  }

  async getOrderById(orderId: string) {
    return this.orderModel
      .findById(orderId)
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: {
            name: 1,
            price: 1,
            image: 1,
          },
        },
      })
      .exec();
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      {
        ...updateOrderDto,
      },
      {
        new: true,
      },
    );
  }
}
