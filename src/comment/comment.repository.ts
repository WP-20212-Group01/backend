import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CreateCommentDto } from './dtos/create-comment.dto';
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
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();
  }

  async createComment(createCommentDto: CreateCommentDto) {
    return this.commentModel.create({
      ...createCommentDto,
    });
  }
}
