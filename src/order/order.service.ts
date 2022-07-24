import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { GetOrderDto } from './dtos/get-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { products: products } = createOrderDto;
    const orderedProductIds = products.map((product) => product.productId);

    const productList = await this.productService.getProductsByIdList(
      orderedProductIds,
    );

    const productQuantitySet = new Map<string, number>();
    productList.forEach((product) => {
      productQuantitySet.set(product._id.toHexString(), product.stock);
    });

    products.forEach((product) => {
      const { productId, quantity } = product;
      const inStock = productQuantitySet.get(productId);
      if (!inStock) {
        throw new BadRequestException(`Unknown product with ID ${productId}`);
      }
      if (inStock < quantity) {
        throw new BadRequestException(
          `Not enough stock for product with ID ${productId}`,
        );
      }
    });

    return this.orderRepository.createOrder(createOrderDto);
  }

  async getOrders(getOrderDto: GetOrderDto) {
    return this.orderRepository.getOrders(getOrderDto);
  }

  async getOrderById(orderId: string) {
    return this.orderRepository.getOrderById(orderId);
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) {
    try {
      const { status } = updateOrderDto;
      if (status === OrderStatus.COMPLETED) {
        const order = await this.getOrderById(orderId);
        if (!order) throw new Error(`No order with ID ${orderId}`);

        await this.productService.consumeProductStock(order.products);
      }
      return this.orderRepository.updateOrder(orderId, updateOrderDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
