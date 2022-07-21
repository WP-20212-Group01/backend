import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { MONGODB_CONNECTION } from '../database/database.constants';
import { Comment } from './schemas/comment.schema';

export const commentProviders: FactoryProvider[] = [
  ...[Comment].map<FactoryProvider>((ModelClass) => ({
    provide: ModelClass,
    inject: [MONGODB_CONNECTION],
    useFactory: () => getModelForClass(ModelClass),
  })),
];
