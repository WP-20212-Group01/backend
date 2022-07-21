import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentDto } from './dtos/get-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getComments(getCommentDto: GetCommentDto) {
    return this.commentRepository.getComments(getCommentDto);
  }
}
