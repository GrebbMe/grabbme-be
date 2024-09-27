jest.mock('typeorm-transactional', () => ({
  Transactional: () => jest.fn(),
}));

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicDataService } from './public-data.service';
import { PositionCategory } from './entities/position-category.entity';
import { PostCategory } from './entities/post-category.entity';

describe('msa public-data service 테스트', () => {
  const context = describe;
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Service, Repository가 정의 된다.', () => {
    expect(service).toBeDefined();
    expect(postCategoryRepository).toBeDefined();
    expect(positionCategoryRepository).toBeDefined();
  });

  describe('1. post-category 서비스 로직 테스트', () => {
    const mockPostCategories: PostCategory[] = [
      { id: 1, post_category_name: 'post-category-1' },
      { id: 2, post_category_name: 'post-category-2' },
    ];
    const mockNotFoundError = new NotFoundException('데이터가 없습니다.');

    afterEach(() => {
      jest.clearAllMocks();
    });

    context(' getPostCategories가 호출 되면,', () => {
      it('SUCCESS: post-category의 전체 데이터를 반환 한다.', async () => {
        jest.spyOn(postCategoryRepository, 'find').mockResolvedValue(mockPostCategories);
        const result = await service.getPostCategories();
        expect(result).toEqual(mockPostCategories);
        expect(postCategoryRepository.find).toHaveBeenCalled();
      });

      it('ERROR: post-category의 데이터가 없으면, NotFoundException을 반환 한다.', async () => {
        jest.spyOn(postCategoryRepository, 'find').mockRejectedValue(mockNotFoundError);
        await expect(service.getPostCategories()).rejects.toThrow(NotFoundException);
        expect(postCategoryRepository.find).toHaveBeenCalled();
      });
    });

    context(' getPostCategoryById가 호출 되면,', () => {
      it('SUCCESS: post-category의 id로 데이터를 반환 한다.', async () => {
        jest.spyOn(postCategoryRepository, 'findOne').mockResolvedValue(mockPostCategories[0]);
        const result = await service.getPostCategoryById(1);
        expect(result.id).toEqual(mockPostCategories[0].id);
        expect(postCategoryRepository.findOne).toHaveBeenCalled();
      });
      it('ERROR : 존재하지 않는 id로 조회 하여, NotFoundException을 반환한다.', async () => {
        jest.spyOn(postCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(service.getPostCategoryById(mockPostCategories[0].id + 100)).rejects.toThrow(
          NotFoundException,
        );
      });
      it('ERROR : 정수형이 아닌 id로 조회하면, NotFoundException을 반환한다.', async () => {
        jest.spyOn(postCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(service.getPostCategoryById(0.1)).rejects.toThrow(NotFoundException);
      });
    });
  });
  describe('2. position-category 서비스 로직 테스트', () => {
    const mockPositionCategories: PositionCategory[] = [
      { position_category_id: 1, name: 'BE Dev', kor_name: '백엔드', abbreviation: 'BE' },
      { position_category_id: 2, name: 'FE Dev', kor_name: '프론트엔드', abbreviation: 'FE' },
    ];
    const mockNotFoundError = new NotFoundException('데이터가 없습니다.');

    afterEach(() => {
      jest.clearAllMocks();
    });

    context(' getPositionCategories가 호출 되면,', () => {
      it('SUCCESS : position-category 의 전체 데이터를 반환 한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'find').mockResolvedValue(mockPositionCategories);
        const result = await service.getPositionCategories();
        expect(result).toEqual(mockPositionCategories);
        expect(positionCategoryRepository.find).toHaveBeenCalled();
      });
      it('ERROR : postiion-category의 데이터가 없으면, NotFoundExcepction을 반환한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'find').mockRejectedValue(mockNotFoundError);
        await expect(service.getPositionCategories()).rejects.toThrow(NotFoundException);
        expect(positionCategoryRepository.find).toHaveBeenCalled();
      });
    });
    context(' getPositionCategoryById가 호출 되면,', () => {
      it('SUCCESS : 존재하는 id를 입력받아 position-category 단일 데이터를 반환한다.', async () => {
        jest
          .spyOn(positionCategoryRepository, 'findOne')
          .mockResolvedValue(mockPositionCategories[0]);
        await expect(
          service.getPositionCategoryById(mockPositionCategories[0].position_category_id),
        ).resolves.toEqual(mockPositionCategories[0]);
        expect(positionCategoryRepository.findOne).toHaveBeenCalled();
      });
      it('ERROR : 존재하지 않는 id를 입력받아 NotFoundException을 반환한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(
          service.getPositionCategoryById(mockPositionCategories[0].position_category_id + 100),
        ).rejects.toThrow(NotFoundException);
        expect(positionCategoryRepository.findOne).toHaveBeenCalled();
      });
      it('ERROR : 정수형이 아닌 id를 입력받아 NotFoundException을 반환한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(service.getPositionCategoryById(0.1)).rejects.toThrow(NotFoundException);
        expect(positionCategoryRepository.findOne).toHaveBeenCalled();
      });
    });
  });
});
