import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Connection, Types } from 'mongoose';
import { Category } from '../category/schemas/category.schema';
import { MONGODB_CONNECTION } from '../database/database.constants';
import { OrderProduct } from '../order/schemas/order-product.schema';
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
    @Inject(MONGODB_CONNECTION)
    private readonly mongoConnection: Connection,
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

  async consumeProductStock(orderedProducts: OrderProduct[]) {
    const session = await this.mongoConnection.startSession();

    session.startTransaction();

    try {
      await Promise.allSettled(
        orderedProducts.map(async (orderedProduct) => {
          const { product, quantity } = orderedProduct;

          const updated = await this.productModel.findOneAndUpdate(
            {
              _id: product as Types.ObjectId,
              stock: { $gte: quantity },
            },
            {
              $inc: { stock: -quantity },
            },
            {
              new: true,
            },
          );

          if (!updated)
            throw new Error(`No product or out of stock: ${product}`);
        }),
      );

      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
