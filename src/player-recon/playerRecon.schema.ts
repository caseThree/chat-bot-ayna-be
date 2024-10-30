import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerReconDocument = HydratedDocument<PlayerRecon>;

@Schema()
export class PlayerRecon {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  time: string;

  @Prop()
  startTime: string;

  @Prop()
  count: number;
}

export const PlayerReconSchema = SchemaFactory.createForClass(PlayerRecon);
