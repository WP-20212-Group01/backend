import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
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
}
