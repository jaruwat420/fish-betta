import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  @Prop({ default: 'user' })
  role: string;

  @ApiProperty({ example: true })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop()
  lastLoginAt?: Date;

  @ApiProperty()
  @Prop({
    type: {
      plan: { type: String, default: 'trial' },
      status: { type: String, default: 'active' },
      expiresAt: { type: Date },
    },
  })
  subscription?: {
    plan: string;
    status: string;
    expiresAt?: Date;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
