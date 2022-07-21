import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { GetCommentDto } from './dtos/get-comment.dto';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentRepository {
  constructor(
    @Inject(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}

  async getComments(getCommentDto: GetCommentDto): Promise<Comment[]> {
    const pageSize = 10;
    const { productId, page } = getCommentDto;
    return this.commentModel
      .find({
        product: new Types.ObjectId(productId),
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();
  }
}
