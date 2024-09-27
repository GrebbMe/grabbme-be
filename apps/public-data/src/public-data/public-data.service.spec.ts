import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicDataService } from './public-data.service';
import { PositionCategory } from './entities/position-category.entity';
import { PostCategory } from './entities/post-category.entity';

describe('PublicDataService', () => {
  let service: PublicDataService;
  let postCategoryRepository: Repository<PostCategory>;
  let positionCategoryRepository: Repository<PositionCategory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicDataService,
        {
          provide: getRepositoryToken(PostCategory),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PositionCategory),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PublicDataService>(PublicDataService);
    postCategoryRepository = module.get<Repository<PostCategory>>(getRepositoryToken(PostCategory));
    positionCategoryRepository = module.get<Repository<PositionCategory>>(
      getRepositoryToken(PositionCategory),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPostCategories', () => {
    it('should return an array of post categories', async () => {
      const result = [new PostCategory()];
      jest.spyOn(postCategoryRepository, 'find').mockResolvedValue(result);

      expect(await service.getPostCategories()).toBe(result);
    });

    it('should throw a NotFoundException if no post categories are found', async () => {
      jest.spyOn(postCategoryRepository, 'find').mockResolvedValue([]);

      await expect(service.getPostCategories()).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPostCategoryById', () => {
    it('should return a post category by id', async () => {
      const result = new PostCategory();
      jest.spyOn(postCategoryRepository, 'findOne').mockResolvedValue(result);

      expect(await service.getPostCategoryById(1)).toBe(result);
    });

    it('should throw a NotFoundException if no post category is found', async () => {
      jest.spyOn(postCategoryRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getPostCategoryById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPositionCategories', () => {
    it('should return an array of position categories', async () => {
      const result = [new PositionCategory()];
      jest.spyOn(positionCategoryRepository, 'find').mockResolvedValue(result);

      expect(await service.getPositionCategories()).toBe(result);
    });

    it('should throw a NotFoundException if no position categories are found', async () => {
      jest.spyOn(positionCategoryRepository, 'find').mockResolvedValue([]);

      await expect(service.getPositionCategories()).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPositionCategoryById', () => {
    it('should return a position category by id', async () => {
      const result = new PositionCategory();
      jest.spyOn(positionCategoryRepository, 'findOne').mockResolvedValue(result);

      expect(await service.getPositionCategoryById(1)).toBe(result);
    });

    it('should throw a NotFoundException if no position category is found', async () => {
      jest.spyOn(positionCategoryRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getPositionCategoryById(1)).rejects.toThrow(NotFoundException);
    });
  });
});
