import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { MONGODB_CONNECTION } from '../database/database.constants';
import { Order } from './schemas/order.schema';

export const orderProviders: FactoryProvider[] = [
  ...[Order].map<FactoryProvider>((ModelClass) => ({
    provide: ModelClass,
    inject: [MONGODB_CONNECTION],
    useFactory: () => getModelForClass(ModelClass),
  })),
];
