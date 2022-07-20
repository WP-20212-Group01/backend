import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../database/database.module';
import { CategoryRepository } from './category.repository';
import { categoryProviders } from './category.providers';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService, CategoryRepository, ...categoryProviders],
  controllers: [CategoryController],
})
export class CategoryModule {}
