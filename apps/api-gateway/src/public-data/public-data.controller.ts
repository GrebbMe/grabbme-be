import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { PublicDataService } from './public-data.service';
import { CreatePublicDatumDto } from './dto/create-public-datum.dto';
import { UpdatePublicDatumDto } from './dto/update-public-datum.dto';

@Controller('public-data')
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @Post()
  private create(@Body() createPublicDatumDto: CreatePublicDatumDto) {
    return this.publicDataService.create(createPublicDatumDto);
  }

  @Patch(':id')
  private update(@Param('id') id: string, @Body() updatePublicDatumDto: UpdatePublicDatumDto) {
    return this.publicDataService.update(+id, updatePublicDatumDto);
  }
}
