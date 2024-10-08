import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostCategory } from 'apps/public-data/src/public-data/entities/post-category.entity';
import { firstValueFrom, of } from 'rxjs';
import { PublicDataController } from './public-data.controller';
import { PublicDataService } from './public-data.service';

describe('Public-Data Controller 테스트', () => {
  const context = describe;
  let controller: PublicDataController;
  let service: PublicDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicDataController],
      providers: [
        {
          provide: PublicDataService,
          useValue: {
            getPostCategories: jest.fn(),
            getPostCategoryById: jest.fn(),
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

  it('Public-Data Controller, Service 가 정의 된다.', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('post-category API 테스트', () => {
    context('getPostCategories 를 호출 하면,', () => {
      it('전체 post-category Data가 조회 된다.', async () => {
        const mockPostCategories: PostCategory[] = [{ id: 1, post_category_name: '팀원 모집' }];
        jest
          .spyOn(service, 'getPostCategories')
          .mockImplementation(async () => of(mockPostCategories));

        const result = await firstValueFrom(await controller.getPostCategories());
        expect(result).toEqual(mockPostCategories);
        expect(service.getPostCategories).toHaveBeenCalled();
      });

      it('에러 발생으로 인해 NotFoundException이 발생한다', async () => {
        const mockError = new Error(NotFoundException.name);

        jest.spyOn(service, 'getPostCategories').mockImplementation(() => {
          throw mockError;
        });

        expect(controller.getPostCategories()).rejects.toThrow(mockError);

        expect(service.getPostCategories).toHaveBeenCalled();
      });
    });

    context('getPostCategoryById를 호출 하면,', () => {
      it('특정 post-category가 조회 된다.', async () => {
        const mockPostCategory: PostCategory = { id: 1, post_category_name: '팀원 모집' };
        jest
          .spyOn(service, 'getPostCategoryById')
          .mockImplementation(async () => await of(mockPostCategory));

        const result = await firstValueFrom(
          await controller.getPostCategoryById({ id: mockPostCategory.id }),
        );

        expect(result).toEqual(mockPostCategory);
        expect(service.getPostCategoryById).toHaveBeenCalledWith(mockPostCategory.id);
      });
      it('존재 하지 않는 id를 입력하여 NotFoundException 이 발생한다.', async () => {
        const mockError = new Error(NotFoundException.name);

        jest.spyOn(service, 'getPostCategoryById').mockImplementation(() => {
          throw mockError;
        });

        expect(controller.getPostCategoryById({ id: 999 })).rejects.toThrow(mockError);

        expect(service.getPostCategoryById).toHaveBeenCalledWith(999);
      });
    });
  });
});
