import { Injectable } from '@nestjs/common';
import { UpdateUseDto } from './dto/updateUse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerRecon } from './playerRecon.schema';

@Injectable()
export class PlayerReconService {
  constructor(
    @InjectModel('player-recon')
    private readonly playerReconModel: Model<PlayerRecon>,
  ) {}

  async updateUse(updateUse: UpdateUseDto) {
    const existingPlayer = await this.playerReconModel.findOne({
      userId: updateUse.userId,
    });

    if (existingPlayer) {
      existingPlayer.time = new Date().toDateString();
      existingPlayer.count += 1;
      await existingPlayer.save();
    } else {
      const newPlayer = await this.playerReconModel.create({
        userId: updateUse.userId,
        username: updateUse.username,
        time: new Date().toDateString(),
        startTime: new Date().toDateString(),
        count: 1,
      });

      await newPlayer.save();
    }
  }
}
