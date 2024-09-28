import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PublicDataController } from './public-data.controller';
import { PublicDataService } from './public-data.service';
import { GetPositionCategoryByIdDto } from './dto/get-position-categoy-by-id.dto';
import { PositionCategory } from './entities/position-category.entity';

describe('MSA public-data controller 테스트', () => {
  const context = describe;
  let service: PublicDataService;
  let controller: PublicDataController;
  let mockError: Error;

  const positionCategoriesFixture: PositionCategory[] = [
    {
      position_category_id: 1,
      name: 'Frontend Developer',
      kor_name: '프론트엔드 개발자',
      abbreviation: 'FE',
    },
    {
      position_category_id: 2,
      name: 'Backend Developer',
      kor_name: '백엔드 개발자',
      abbreviation: 'BE',
    },
    {
      position_category_id: 3,
      name: 'DevOps Engineer',
      kor_name: '데브옵스 엔지니어',
      abbreviation: 'DevOps',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicDataController],
      providers: [
        {
          provide: PublicDataService,
          useValue: {
            getPositionCategories: jest.fn(),
            getPositionCategoryById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PublicDataController>(PublicDataController);
    service = module.get<PublicDataService>(PublicDataService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Controller, Service가 정의 된다.', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('1. position-category contoller 테스트', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    context('getPositionCategories를 호출하면,', () => {
      it('SUCCESS :전체 position-category 데이터가 조회 된다.', async () => {
        jest.spyOn(service, 'getPositionCategories').mockResolvedValue(positionCategoriesFixture);
        const result = await controller.getPositionCategories();
        expect(result).toEqual(positionCategoriesFixture);
        expect(service.findAllPositionCategory).toHaveBeenCalled();
      });
      it('ERROR : NotFoundException이 발생한다.', async () => {
        mockError = new Error(NotFoundException.name);
        jest.spyOn(service, 'getPositionCategories').mockRejectedValue(mockError);
        await expect(controller.getPositionCategories()).rejects.toThrow(mockError);
        expect(service.findAllPositionCategory).toHaveBeenCalled();
      });
    });
    context('getPositionCategoryById를 호출하면,', () => {
      it('SUCCESS : 존재하는 id로 특정 position-category 데이터가 조회된다.', async () => {
        const categoryId: GetPositionCategoryByIdDto = { id: 1 };
        jest
          .spyOn(service, 'getPositionCategoryById')
          .mockResolvedValue({ ...positionCategoriesFixture[0] });
        const result = await controller.getPositionCategoryById(categoryId);
        expect(result).toEqual(positionCategoriesFixture[0]);
        expect(service.findPositionCategoryById).toHaveBeenCalledWith(categoryId.id);
      });
      it('ERROR : 존재하지 않는 id 로 조회 시 NotFoudnException이 발생한다.', async () => {
        const categoryId: GetPositionCategoryByIdDto = { id: 999 };
        mockError = new Error(NotFoundException.name);
        jest.spyOn(service, 'getPositionCategoryById').mockRejectedValue(mockError);
        await expect(controller.getPositionCategoryById(categoryId)).rejects.toThrow(mockError);
        expect(service.findPositionCategoryById).toHaveBeenCalledWith(categoryId.id);
      });
    });
  });
});
