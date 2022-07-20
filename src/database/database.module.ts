import { Module, OnModuleDestroy } from '@nestjs/common';
import mongoose from 'mongoose';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnModuleDestroy {
  onModuleDestroy() {
    mongoose.disconnect();
  }
}
