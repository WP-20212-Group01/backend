import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { MONGODB_CONNECTION } from '../database/database.constants';
import { Admin } from './schemas/admin.schema';

export const adminProviders: FactoryProvider[] = [
  ...[Admin].map<FactoryProvider>((ModelClass) => ({
    provide: ModelClass,
    inject: [MONGODB_CONNECTION],
    useFactory: () => getModelForClass(ModelClass),
  })),
];
