import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Get all categories
   * @returns All categories: name, slug
   */
  @Get('')
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
