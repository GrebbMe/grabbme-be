jest.mock('typeorm-transactional', () => ({
  Transactional: () => jest.fn(),
}));

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  CareerCategory,
  StackCategory,
  PositionCategory,
  PostCategory,
  ProjectCategory,
} from '@publicData/entities';
import { publicDataExamples } from '@shared/constants/mock-example';
import { Repository } from 'typeorm';
import { PublicDataService } from './public-data.service';

describe('msa public-data service 로직 테스트', () => {
  const context = describe;
  const mockNotFoundError = new NotFoundException('데이터가 없습니다.');

  let service: PublicDataService;
  let postCategoryRepository: Repository<PostCategory>;
  let positionCategoryRepository: Repository<PositionCategory>;
  let projectCategoryRepository: Repository<ProjectCategory>;
  let stackCategoryRepository: Repository<StackCategory>;
  let careerCategoryRepository: Repository<CareerCategory>;

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
        {
          provide: getRepositoryToken(ProjectCategory),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(StackCategory),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CareerCategory),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PublicDataService>(PublicDataService);
    postCategoryRepository = module.get<Repository<PostCategory>>(getRepositoryToken(PostCategory));
    positionCategoryRepository = module.get<Repository<PositionCategory>>(
      getRepositoryToken(PositionCategory),
    );
    projectCategoryRepository = module.get<Repository<ProjectCategory>>(
      getRepositoryToken(ProjectCategory),
    );
    stackCategoryRepository = module.get<Repository<StackCategory>>(
      getRepositoryToken(StackCategory),
    );
    careerCategoryRepository = module.get<Repository<CareerCategory>>(
      getRepositoryToken(CareerCategory),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Service, Repository가 정의 된다.', () => {
    expect(service).toBeDefined();
    expect(postCategoryRepository).toBeDefined();
    expect(positionCategoryRepository).toBeDefined();
    expect(projectCategoryRepository).toBeDefined();
    expect(stackCategoryRepository).toBeDefined();
    expect(careerCategoryRepository).toBeDefined();
  });

  describe('1. post-category 서비스 로직 테스트', () => {
    const mockPostCategories: PostCategory[] = publicDataExamples.postCategory.map((data) => data);

    afterEach(() => {
      jest.clearAllMocks();
    });

    context(' findAllPostCategory가 호출 되면,', () => {
      it('SUCCESS: post-category의 전체 데이터를 반환 한다.', async () => {
        jest.spyOn(postCategoryRepository, 'find').mockResolvedValue(mockPostCategories);
        const result = await service.findAllPostCategory();
        expect(result).toEqual(mockPostCategories);
        expect(postCategoryRepository.find).toHaveBeenCalled();
      });

      it('ERROR: post-category의 데이터가 없으면, NotFoundException을 반환 한다.', async () => {
        jest.spyOn(postCategoryRepository, 'find').mockRejectedValue(mockNotFoundError);
        await expect(service.findAllPostCategory()).rejects.toThrow(NotFoundException);
        expect(postCategoryRepository.find).toHaveBeenCalled();
      });
    });

    context(' findPostCategoryById가 호출 되면,', () => {
      it('SUCCESS: post-category의 id로 데이터를 반환 한다.', async () => {
        jest.spyOn(postCategoryRepository, 'findOne').mockResolvedValue(mockPostCategories[0]);
        const result = await service.findPostCategoryById(1);
        expect(result.id).toEqual(mockPostCategories[0].id);
        expect(postCategoryRepository.findOne).toHaveBeenCalled();
      });
      it('ERROR : 존재하지 않는 id로 조회 하여, NotFoundException을 반환한다.', async () => {
        jest.spyOn(postCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(service.findPostCategoryById(mockPostCategories[0].id + 100)).rejects.toThrow(
          NotFoundException,
        );
      });
      it('ERROR : 정수형이 아닌 id로 조회하면, NotFoundException을 반환한다.', async () => {
        jest.spyOn(postCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(service.findPostCategoryById(0.1)).rejects.toThrow(NotFoundException);
      });
    });
  });
  describe('2. position-category 서비스 로직 테스트', () => {
    const mockPositionCategories: PositionCategory[] = publicDataExamples.positionCategory.map(
      (data) => data,
    );
    const mockNotFoundError = new NotFoundException('데이터가 없습니다.');

    afterEach(() => {
      jest.clearAllMocks();
    });

    context(' findAllPositionCategory가 호출 되면,', () => {
      it('SUCCESS : position-category 의 전체 데이터를 반환 한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'find').mockResolvedValue(mockPositionCategories);
        const result = await service.findAllPositionCategory();
        expect(result).toEqual(mockPositionCategories);
        expect(positionCategoryRepository.find).toHaveBeenCalled();
      });
      it('ERROR : postiion-category의 데이터가 없으면, NotFoundExcepction을 반환한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'find').mockRejectedValue(mockNotFoundError);
        await expect(service.findAllPositionCategory()).rejects.toThrow(NotFoundException);
        expect(positionCategoryRepository.find).toHaveBeenCalled();
      });
    });
    context(' findPositionCategoryById가 호출 되면,', () => {
      it('SUCCESS : 존재하는 id를 입력받아 position-category 단일 데이터를 반환한다.', async () => {
        jest
          .spyOn(positionCategoryRepository, 'findOne')
          .mockResolvedValue(mockPositionCategories[0]);
        await expect(
          service.findPositionCategoryById(mockPositionCategories[0].position_category_id),
        ).resolves.toEqual(mockPositionCategories[0]);
        expect(positionCategoryRepository.findOne).toHaveBeenCalled();
      });
      it('ERROR : 존재하지 않는 id를 입력받아 NotFoundException을 반환한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(
          service.findPositionCategoryById(mockPositionCategories[0].position_category_id + 100),
        ).rejects.toThrow(NotFoundException);
        expect(positionCategoryRepository.findOne).toHaveBeenCalled();
      });
      it('ERROR : 정수형이 아닌 id를 입력받아 NotFoundException을 반환한다.', async () => {
        jest.spyOn(positionCategoryRepository, 'findOne').mockRejectedValue(mockNotFoundError);
        await expect(service.findPositionCategoryById(0.1)).rejects.toThrow(NotFoundException);
        expect(positionCategoryRepository.findOne).toHaveBeenCalled();
      });
    });
  });
  describe('3. project-category 서비스 로직 테스트', () => {
    const mockProjectCategories: ProjectCategory[] = publicDataExamples.projectCategory.map(
      (data) => data,
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    context(' findProjectCategories가 호출 되면,', () => {
      it('SUCCESS : project-category의 전체 데이터를 반환한다.', async () => {
        jest.spyOn(projectCategoryRepository, 'find').mockResolvedValue(mockProjectCategories);
        const result = await service.findAllProjectCategory();
        expect(result).toEqual(mockProjectCategories);
        expect(projectCategoryRepository.find).toHaveBeenCalled();
      });

      it('ERROR : project-category의 데이터가 없으면, NotFoundException을 반환한다.', async () => {
        jest.spyOn(projectCategoryRepository, 'find').mockResolvedValue([]);
        const result = service.findAllProjectCategory();
        await expect(result).rejects.toThrow(mockNotFoundError);
        expect(projectCategoryRepository.find).toHaveBeenCalled();
      });
    });
    context(' findProjectCategoryById 가 호출 되면,', () => {
      it('SUCCESS : 존재하는 id를 입력받아 project-category 단일 데이터를 반환한다.', async () => {
        jest
          .spyOn(projectCategoryRepository, 'findOne')
          .mockResolvedValue(mockProjectCategories[0]);
        const result = await service.findProjectCategoryById(
          mockProjectCategories[0].project_category_id,
        );
        expect(result).toEqual(mockProjectCategories[0]);

        expect(projectCategoryRepository.findOne).toHaveBeenCalledWith({
          where: { project_category_id: mockProjectCategories[0].project_category_id },
        });
      });
      it('ERROR : 존재하지 않는 id를 입력받아 NotFoundException을 반환 한다.', async () => {
        jest.spyOn(projectCategoryRepository, 'findOne').mockResolvedValue(null);
        await expect(service.findProjectCategoryById(100)).rejects.toThrow(mockNotFoundError);
        expect(projectCategoryRepository.findOne).toHaveBeenCalledWith({
          where: { project_category_id: 100 },
        });
      });
    });
  });
  describe('4. stack-category 서비스 로직 테스트', () => {
    const mockStackCategories: StackCategory[] = publicDataExamples.stackCategory.map(
      (data) => data,
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    context(' findAllStackCategories가 호출 되면,', () => {
      it('SUCCESS : stack-category 의 전체 데이터를 반환 한다.', async () => {
        jest.spyOn(stackCategoryRepository, 'find').mockResolvedValue(mockStackCategories);
        const result = await service.findAllStackCategory();
        expect(result).toEqual(mockStackCategories);
        expect(stackCategoryRepository.find).toHaveBeenCalled();
      });
      it('ERROR : stack-category의 데이터가 없어,  NotFoundException을 반환한다.', async () => {
        jest.spyOn(stackCategoryRepository, 'find').mockResolvedValue([]);
        await expect(service.findAllStackCategory()).rejects.toThrow(mockNotFoundError);
        expect(stackCategoryRepository.find).toHaveBeenCalled();
      });
    });

    context(' findStackCategoryById 가 호출 되면,', () => {
      it('SUCCESS : 존재하는 id를 입력받아 stack-category 단일 데이터를 반환한다.', async () => {
        jest.spyOn(stackCategoryRepository, 'findOne').mockResolvedValue(mockStackCategories[0]);
        const result = await service.findStackCategoryById(
          mockStackCategories[0].stack_category_id,
        );
        expect(result).toEqual(mockStackCategories[0]);
        expect(stackCategoryRepository.findOne).toHaveBeenCalledWith({
          where: { stack_category_id: mockStackCategories[0].stack_category_id },
        });
      });

      it('ERROR : 존재하지 않는 id를 입력받아 NotFoundException을 반환한다.', async () => {
        jest.spyOn(stackCategoryRepository, 'findOne').mockResolvedValue(null);
        await expect(service.findStackCategoryById(100)).rejects.toThrow(mockNotFoundError);
        expect(stackCategoryRepository.findOne).toHaveBeenCalledWith({
          where: { stack_category_id: 100 },
        });
      });
    });
  });
  describe('5. career-category 서비스 로직 테스트', () => {
    const mockCareerCategories: CareerCategory[] = publicDataExamples.careerCategory.map(
      (data) => data,
    );
    afterEach(() => {
      jest.clearAllMocks();
    });
    context(' findAllCareerCategory 가 호출 되면,', () => {
      it('SUCCESS : career-category의 전체 데이터를 반환 한다.', async () => {
        jest.spyOn(careerCategoryRepository, 'find').mockResolvedValue(mockCareerCategories);
        const result = await service.findAllCareerCategory();
        expect(result).toEqual(mockCareerCategories);
        expect(careerCategoryRepository.find).toHaveBeenCalled();
      });

      it('ERROR : career-category의 데이터가 없으면, NotFoundException을 반환한다.', async () => {
        jest.spyOn(careerCategoryRepository, 'find').mockResolvedValue([]);
        await expect(service.findAllCareerCategory()).rejects.toThrow(mockNotFoundError);
        expect(careerCategoryRepository.find).toHaveBeenCalled();
      });
    });
    context(' findCareerCategoryById 가 호출 되면,', () => {
      it('SUCCESS : 존재하는 id를 입력 받아 career-category 단일 데이터를 반환 한다.', async () => {
        jest.spyOn(careerCategoryRepository, 'findOne').mockResolvedValue(mockCareerCategories[0]);
        const result = await service.findCareerCategoryById(
          mockCareerCategories[0].career_category_id,
        );
        expect(result).toEqual(mockCareerCategories[0]);
        expect(careerCategoryRepository.findOne).toHaveBeenCalledWith({
          where: { career_category_id: mockCareerCategories[0].career_category_id },
        });
      });
      it('ERROR : 존재하지 않는 id를 입력 받아, NotFoundException 을 반환 한다.', async () => {
        jest.spyOn(careerCategoryRepository, 'findOne').mockResolvedValue(null);
        await expect(service.findCareerCategoryById(100)).rejects.toThrow(mockNotFoundError);
        expect(careerCategoryRepository.findOne).toHaveBeenCalledWith({
          where: { career_category_id: 100 },
        });
      });
    });
  });
});
