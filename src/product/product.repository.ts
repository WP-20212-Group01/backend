import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Category } from '../category/schemas/category.schema';
import { AddProductDto } from './dtos/add-product.dto';
import { ProductFilterDto } from './dtos/product-filter.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
    @Inject(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
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
        {
          $lookup: {
            from: this.categoryModel.collection.collectionName,
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
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

  async getProductsByIdList(idList: string[]): Promise<Product[]> {
    return this.productModel
      .find({
        _id: { $in: idList.map((id) => new Types.ObjectId(id)) },
      })
      .lean()
      .exec();
  }

  async addProduct(
    addProductDto: AddProductDto,
    category: Types.ObjectId,
  ): Promise<Product> {
    return this.productModel.create({
      ...addProductDto,
      category,
    });
  }
}
