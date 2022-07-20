import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import { ProductFilterDto } from './dtos/product-filter.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Get products by filter
   * @param productFilterDto Query Dto
   * @returns Products found with pagination
   */
  @Get('/')
  async getProductsByFilter(@Query() productFilterDto: ProductFilterDto) {
    return this.productService.getProductsByFilter(productFilterDto);
  }

  /**
   * Get product by ID
   * @param id Product ID
   * @returns Found product, or null if not
   */
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('ID must be a valid mongo ID');
    return this.productService.getProductById(id);
  }
}
