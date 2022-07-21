import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { productProviders } from './product.providers';
import { DatabaseModule } from '../database/database.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
  providers: [ProductService, ProductRepository, ...productProviders],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
