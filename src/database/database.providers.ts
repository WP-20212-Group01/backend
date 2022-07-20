import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { ConfigInterface } from '../config/config.interface';
import { MONGODB_CONNECTION } from './database.constants';

export const databaseProviders: FactoryProvider[] = [
  {
    provide: MONGODB_CONNECTION,
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService<ConfigInterface>,
    ): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('MONGODB_CONNECTION_STRING') || '', {
        connectTimeoutMS: 10_000,
      }),
  },
];
