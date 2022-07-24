import { prop } from '@typegoose/typegoose';

export class Admin {
  @prop()
  username: string;

  @prop()
  hashedPassword: string;
}
