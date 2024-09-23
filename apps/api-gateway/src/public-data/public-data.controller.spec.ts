import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostCategory } from 'apps/public-data/src/public-data/entities/post-category.entity';
import { firstValueFrom, of } from 'rxjs';
import { PublicDataController } from './public-data.controller';
import { PublicDataService } from './public-data.service';

describe('PublicDataController', () => {
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

  it('Controller, Service 가 정의 된다.', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('postData', () => {
    it('전체 post-category Data 조회', async () => {
      const mockPostCategories: PostCategory[] = [{ id: 1, post_category_name: '팀원 모집' }];
      jest
        .spyOn(service, 'getAllPostCategory')
        .mockImplementation(async () => await of(mockPostCategories));

      const result = await firstValueFrom(await controller.getAllPostCategory());
      expect(result).toEqual(mockPostCategories);
      expect(service.getAllPostCategory).toHaveBeenCalled();
    });

    it('특정 post-category data 조회', async () => {
      const mockPostCategory: PostCategory = { id: 1, post_category_name: '팀원 모집' };
      jest
        .spyOn(service, 'getPostCategoryById')
        .mockImplementation(async () => await of(mockPostCategory));

      const result = await firstValueFrom(await controller.getPostCategoryById(1));
      expect(result).toEqual(mockPostCategory);
      expect(service.getPostCategoryById).toHaveBeenCalledWith(1);
    });

    it('전체 post-category data 조회 에러', async () => {
      const mockError = new Error(NotFoundException.name);
      jest.spyOn(service, 'getAllPostCategory').mockImplementation(() => {
        throw mockError;
      });

      try {
        await firstValueFrom(await controller.getAllPostCategory());
      } catch (error) {
        expect(error).toBe(mockError);
      }
      expect(service.getAllPostCategory).toHaveBeenCalled();
    });

    it('특정 post-category data 조회 에러', async () => {
      const mockError = new Error(NotFoundException.name);
      jest.spyOn(service, 'getPostCategoryById').mockImplementation(() => {
        throw mockError;
      });

      try {
        await firstValueFrom(await controller.getPostCategoryById(999));
      } catch (error) {
        expect(error).toBe(mockError);
      }
      expect(service.getPostCategoryById).toHaveBeenCalledWith(999);
    });
  });
});
