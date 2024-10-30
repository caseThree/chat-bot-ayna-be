import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerReconController } from './playerRecon.controller';
import { PlayerReconService } from './playerRecon.service';
import { PlayerReconSchema } from "./playerRecon.schema";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'player-recon', schema: PlayerReconSchema },
    ]),
  ],
  controllers: [PlayerReconController],
  providers: [PlayerReconService],
})
export class PlayerReconModule {}
