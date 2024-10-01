import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop()
  name: string;

  @Prop()
  createdBy: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
