import { Injectable } from '@nestjs/common';
import { GetOrderDto } from '../order/dtos/get-order.dto';
import { UpdateOrderDto } from '../order/dtos/update-order.dto';
import { OrderService } from '../order/order.service';
import { AddProductDto } from '../product/dtos/add-product.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  async addProduct(addProductDto: AddProductDto) {
    return this.productService.addProduct(addProductDto);
  }

  async getOrders(getOrderDto: GetOrderDto) {
    return this.orderService.getOrders(getOrderDto);
  }

  async getOrderById(orderId: string) {
    return this.orderService.getOrderById(orderId);
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }
}
