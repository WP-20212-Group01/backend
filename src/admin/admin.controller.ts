import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetOrderDto } from '../order/dtos/get-order.dto';
import { UpdateOrderDto } from '../order/dtos/update-order.dto';
import { AddProductDto } from '../product/dtos/add-product.dto';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ description: 'Add a product' })
  @Post('/product')
  async addProduct(@Body() addProductDto: AddProductDto) {
    return this.adminService.addProduct(addProductDto);
  }

  @ApiOperation({ description: 'Get all orders' })
  @Get('/order')
  async getOrders(@Query() getOrderDto: GetOrderDto) {
    return this.adminService.getOrders(getOrderDto);
  }

  @ApiOperation({ description: 'Get an order by ID' })
  @Get('/order/:id')
  async getOrderById(@Param('id') orderId: string) {
    return this.adminService.getOrderById(orderId);
  }

  @ApiOperation({ description: 'Update an order by ID' })
  @Put('/order/:id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.adminService.updateOrder(orderId, updateOrderDto);
  }
}
