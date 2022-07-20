import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Category {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @prop()
  name: string;

  /**
   * For searching purposes
   */
  @prop()
  slug: string;
}
