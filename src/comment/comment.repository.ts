import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentRepository {
  constructor(
    @Inject(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}

  async getComments(): Promise<Comment[]> {
    return this.commentModel.find().lean().exec();
  }
}
