import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: 'The creation timestamp of the user',
    example: '2025-12-18T04:16:26.194Z',
  })
  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
