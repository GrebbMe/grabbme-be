import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Chat } from './chat.entity';

@Schema({ collection: 'chat_list' })
export class ChatList extends Document {
  @Prop({ required: true })
  public chat_list_id: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Chat.name }] })
  public chats: Chat[];

  @Prop({ default: Date.now })
  public created_at: Date;

  @Prop({ default: Date.now })
  public updated_at: Date;
}

export const CHAT_LIST_SCHEMA: mongoose.Schema = SchemaFactory.createForClass(ChatList);
