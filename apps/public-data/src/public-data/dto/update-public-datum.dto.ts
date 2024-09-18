import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicDatumDto } from './create-public-datum.dto';

export class UpdatePublicDatumDto extends PartialType(CreatePublicDatumDto) {
  public id: number;
}
