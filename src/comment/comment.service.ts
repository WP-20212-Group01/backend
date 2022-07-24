import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { GetCommentDto } from './dtos/get-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly productService: ProductService,
  ) {}

  async getComments(getCommentDto: GetCommentDto) {
    return this.commentRepository.getComments(getCommentDto);
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const productId = createCommentDto.product;
    const product = await this.productService.getProductById(productId);
    if (!product?.name)
      throw new BadRequestException(`Unknown product with ID ${productId}`);
    return this.commentRepository.createComment(createCommentDto);
  }
}
