import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { DatabaseModule } from '../database/database.module';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.providers';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, ...commentProviders],
})
export class CommentModule {}
