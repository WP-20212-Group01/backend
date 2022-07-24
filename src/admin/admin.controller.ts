import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetOrderDto } from '../order/dtos/get-order.dto';
import { UpdateOrderDto } from '../order/dtos/update-order.dto';
import { AddProductDto } from '../product/dtos/add-product.dto';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ description: 'Add a product' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/product')
  async addProduct(@Body() addProductDto: AddProductDto) {
    return this.adminService.addProduct(addProductDto);
  }

  @ApiOperation({ description: 'Get all orders' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/order')
  async getOrders(@Query() getOrderDto: GetOrderDto) {
    return this.adminService.getOrders(getOrderDto);
  }

  @ApiOperation({ description: 'Get an order by ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/order/:id')
  async getOrderById(@Param('id') orderId: string) {
    return this.adminService.getOrderById(orderId);
  }

  @ApiOperation({ description: 'Update an order by ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/order/:id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.adminService.updateOrder(orderId, updateOrderDto);
  }
}
