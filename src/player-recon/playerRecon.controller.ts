import { Body, Controller, Post } from "@nestjs/common";
import { PlayerReconService } from './playerRecon.service';
import { UpdateUseDto } from './dto/updateUse.dto';

@Controller('player-recon')
export class PlayerReconController {
  constructor(private readonly playerReconService: PlayerReconService) {}

  @Post('update-use')
  updateUse(@Body() updateUse: UpdateUseDto) {
    return this.playerReconService.updateUse(updateUse);
  }
}
