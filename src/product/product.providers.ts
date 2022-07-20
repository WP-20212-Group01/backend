import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { MONGODB_CONNECTION } from '../database/database.constants';
import { Product } from './schemas/product.schema';

export const productProviders: FactoryProvider[] = [
  ...[Product].map<FactoryProvider>((ModelClass) => ({
    provide: ModelClass,
    inject: [MONGODB_CONNECTION],
    useFactory: () => getModelForClass(ModelClass),
  })),
];
