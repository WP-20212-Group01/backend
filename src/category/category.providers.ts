import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { MONGODB_CONNECTION } from '../database/database.constants';
import { Category } from './schemas/category.schema';

export const categoryProviders: FactoryProvider[] = [
  ...[Category].map<FactoryProvider>((ModelClass) => ({
    provide: ModelClass,
    inject: [MONGODB_CONNECTION],
    useFactory: () => getModelForClass(ModelClass),
  })),
];
