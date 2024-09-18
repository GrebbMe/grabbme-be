import { Test, TestingModule } from '@nestjs/testing';
import { PublicDataService } from './public-data.service';

describe('PublicDataService', () => {
  let service: PublicDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicDataService],
    }).compile();

    service = module.get<PublicDataService>(PublicDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
