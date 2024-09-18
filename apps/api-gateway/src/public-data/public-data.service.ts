import { Injectable } from '@nestjs/common';
import { CreatePublicDatumDto } from './dto/create-public-datum.dto';
import { UpdatePublicDatumDto } from './dto/update-public-datum.dto';

@Injectable()
export class PublicDataService {
  public create(createPublicDatumDto: CreatePublicDatumDto) {
    return 'This action adds a new publicDatum';
  }

  public update(id: number, updatePublicDatumDto: UpdatePublicDatumDto) {
    return `This action updates a #${id} publicDatum`;
  }
}
