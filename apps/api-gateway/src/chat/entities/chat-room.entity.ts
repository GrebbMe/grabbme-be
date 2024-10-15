import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ChatList } from './chat-list.entity';

@Schema({ collection: 'chat_room' })
export class ChatRoom extends Document {
  @Prop({ required: true })
  public channel_id: number;

  @Prop({ required: true })
  public name: string;

  @Prop()
  public post_id: number;

  @Prop({ type: [Number] })
  public users: number[];

  @Prop({ type: [{ type: Types.ObjectId, ref: ChatList.name }] })
  public chat_lists: number[];

  @Prop()
  public last_chat: string;

  @Prop({ default: Date.now })
  public created_at: Date;

  @Prop({ default: Date.now })
  public updated_at: Date;
}

export const CHAT_ROOM_SCHEMA: mongoose.Schema = SchemaFactory.createForClass(ChatRoom);
