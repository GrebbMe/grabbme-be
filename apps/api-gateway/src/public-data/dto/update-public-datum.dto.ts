import { PartialType } from '@nestjs/swagger';
import { CreatePublicDatumDto } from './create-public-datum.dto';

export class UpdatePublicDatumDto extends PartialType(CreatePublicDatumDto) {}
