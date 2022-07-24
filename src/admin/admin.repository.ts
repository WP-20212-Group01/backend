import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @Inject(Admin) private readonly adminModel: ReturnModelType<typeof Admin>,
  ) {}

  getAdminByUsername(username: string): Promise<Admin> {
    return this.adminModel.findOne({ username }).lean().exec();
  }
}
