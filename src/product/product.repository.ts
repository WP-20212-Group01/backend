import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { ProductFilterDto } from './dtos/product-filter.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  async getProductsByFilter(
    productFilterDto: ProductFilterDto,
    categoryIds?: Types.ObjectId[],
  ) {
    const { page, limit } = productFilterDto;
    const query = this.productModel.aggregate();

    if (categoryIds?.length) {
      query.match({
        category: { $in: categoryIds },
      });
    }

    query.sort({ _id: -1 });

    query.facet({
      pagination: [
        {
          $count: 'total',
        },
        {
          $addFields: {
            page,
            limit,
          },
        },
      ],
      data: [
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ],
    });
    query.unwind('pagination');

    const [results] = await query.exec();

    if (!results?.data.length) return null;

    return results;
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel.findById(id).lean().exec();
  }
}
