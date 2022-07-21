import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dtos/create-order.dto';
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
}
