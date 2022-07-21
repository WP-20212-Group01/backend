import { Controller, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetCommentDto } from './dtos/get-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('')
  async getComments(@Query() getCommentDto: GetCommentDto) {
    return this.commentService.getComments(getCommentDto);
  }
}
