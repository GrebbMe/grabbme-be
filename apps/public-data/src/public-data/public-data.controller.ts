import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PublicDataService } from './public-data.service';
import { CreatePublicDatumDto } from './dto/create-public-datum.dto';
import { UpdatePublicDatumDto } from './dto/update-public-datum.dto';

@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @MessagePattern('createPublicDatum')
  private create(@Payload() createPublicDatumDto: CreatePublicDatumDto) {
    return this.publicDataService.create(createPublicDatumDto);
  }

  @MessagePattern('updatePublicDatum')
  private update(@Payload() updatePublicDatumDto: UpdatePublicDatumDto) {
    return this.publicDataService.update(updatePublicDatumDto.id, updatePublicDatumDto);
  }
}
