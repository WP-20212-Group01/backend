import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @Inject(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().lean().exec();
  }

  async getCategroiesBySlugs(slugs: string[]): Promise<Category[]> {
    return this.categoryModel
      .find({ slug: { $in: slugs } })
      .select({
        _id: 1,
      })
      .lean()
      .exec();
  }
}
