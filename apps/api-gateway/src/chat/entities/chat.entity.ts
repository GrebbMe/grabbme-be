import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'chat' })
export class Chat extends Document {
  @Prop({ required: true })
  public chat_id: number;

  @Prop({ required: true })
  public sender_id: number;

  @Prop({ required: true })
  public type: string;

  @Prop({ required: true })
  public content: string;

  @Prop({ default: Date.now })
  public created_at: Date;

  @Prop({ required: true })
  public read_cnt: number;
}

export const CHAT_SCHEMA: mongoose.Schema = SchemaFactory.createForClass(Chat);
