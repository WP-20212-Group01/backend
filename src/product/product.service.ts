import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { OrderProduct } from '../order/schemas/order-product.schema';
import { AddProductDto } from './dtos/add-product.dto';
import { ProductFilterDto } from './dtos/product-filter.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async getProductsByFilter(productFilterDto: ProductFilterDto) {
    const { categories } = productFilterDto;
    if (categories?.length) {
      const queryCategories = (
        await this.categoryService.getCategoriesBySlugs(categories)
      ).map((category) => category._id);
      return this.productRepository.getProductsByFilter(
        productFilterDto,
        queryCategories,
      );
    }

    return this.productRepository.getProductsByFilter(productFilterDto);
  }

  async getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }

  async getProductsByIdList(idList: string[]) {
    return this.productRepository.getProductsByIdList(idList);
  }

  async addProduct(addProductDto: AddProductDto) {
    const { category } = addProductDto;
    const categoryList = await this.categoryService.getCategoriesBySlugs([
      category,
    ]);
    if (!categoryList?.length) {
      throw new BadRequestException(`Invalid category with slug ${category}`);
    }
    return this.productRepository.addProduct(
      addProductDto,
      categoryList[0]._id,
    );
  }

  async consumeProductStock(orderedProducts: OrderProduct[]) {
    return this.productRepository.consumeProductStock(orderedProducts);
  }
}
