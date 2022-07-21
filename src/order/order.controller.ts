import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { products } = createOrderDto;

    const productSet = new Set<string>(
      products.map((product) => product.productId),
    );
    const productNumber = productSet.size;
    if (productNumber !== products.length) {
      throw new BadRequestException('Duplicated product(s) detected.');
    }

    return this.orderService.createOrder(createOrderDto);
  }
}
