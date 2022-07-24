import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [DatabaseModule, ProductModule, OrderModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
