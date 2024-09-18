import { Test, TestingModule } from '@nestjs/testing';
import { PublicDataController } from './public-data.controller';
import { PublicDataService } from './public-data.service';

describe('PublicDataController', () => {
  let controller: PublicDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicDataController],
      providers: [PublicDataService],
    }).compile();

    controller = module.get<PublicDataController>(PublicDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
