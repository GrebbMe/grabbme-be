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
            getPostData: jest.fn(),
            getOnePostData: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<PublicDataController>(PublicDataController);
    service = module.get<PublicDataService>(PublicDataService);
  });

  it('api-gateway/public-data controller should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('postData', () => {
    it('전체 post-category Data 조회', async () => {
      const mockPostCategories = [{ id: 1, post_category_name: '팀원 모집' }];
      jest.spyOn(service, 'getPostData').mockImplementation(() => of(mockPostCategories));

      const result = await firstValueFrom(await controller.getPostData());
      expect(result).toEqual(mockPostCategories);
      expect(service.getPostData).toHaveBeenCalled();
    });

    it('특정 post-category data 조회', async () => {
      const mockPostCategory: PostCategory = { id: 1, post_category_name: '팀원 모집' };
      jest.spyOn(service, 'getOnePostData').mockImplementation(() => of(mockPostCategory));

      const result = await firstValueFrom(await controller.getOnePostData(1));
      expect(result).toEqual(mockPostCategory);
      expect(service.getOnePostData).toHaveBeenCalledWith(1);
    });

    it('전체 post-category data 조회 에러', async () => {
      const mockError = new Error(NotFoundException.name);
      jest.spyOn(service, 'getPostData').mockImplementation(() => {
        throw mockError;
      });

      try {
        await firstValueFrom(await controller.getPostData());
      } catch (error) {
        expect(error).toBe(mockError);
      }
      expect(service.getPostData).toHaveBeenCalled();
    });

    it('특정 post-category data 조회 에러', async () => {
      const mockError = new Error(NotFoundException.name);
      jest.spyOn(service, 'getOnePostData').mockImplementation(() => {
        throw mockError;
      });

      try {
        await firstValueFrom(await controller.getOnePostData(999));
      } catch (error) {
        expect(error).toBe(mockError);
      }
      expect(service.getOnePostData).toHaveBeenCalledWith(999);
    });
  });
});
