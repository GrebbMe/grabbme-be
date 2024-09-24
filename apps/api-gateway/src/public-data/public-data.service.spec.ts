import { PostCategory } from '@apps/public-data/src/public-data/entities/post-category.entity';
import { NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { MESSAGE } from '@shared/constants/message-pattern';
import { of, firstValueFrom, lastValueFrom } from 'rxjs';
import { PublicDataService } from './public-data.service';

describe('Public- Data Service 테스트', () => {
  const context = describe;
  let service: PublicDataService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicDataService,
        {
          provide: 'PUBLIC_DATA_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PublicDataService>(PublicDataService);
    clientProxy = module.get<ClientProxy>('PUBLIC_DATA_SERVICE');
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('Service, ClientProxy 정의', () => {
    expect(service).toBeDefined();
    expect(clientProxy).toBeDefined();
  });

  describe('post-category 로직 테스트', () => {
    context('getPostCategories 를 호출 하면', () => {
      it('전체 post-category Data가 조회 된다.', async () => {
        const mockPostCategories: PostCategory[] = [{ id: 1, post_category_name: '팀원 모집' }];

        jest.spyOn(clientProxy, 'send').mockImplementation(() => of(mockPostCategories));

        const result = await firstValueFrom(await service.getPostCategories());

        expect(result).toEqual(mockPostCategories);

        expect(clientProxy.send).toHaveBeenCalledWith(
          MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY,
          {},
        );
      });

      it('에러 발생으로 인해 NotFoundException이 발생한다.', async () => {
        const mockError = new Error(NotFoundException.name);

        jest.spyOn(clientProxy, 'send').mockImplementation(() => {
          throw mockError;
        });

        expect(service.getPostCategories()).rejects.toThrow(mockError);

        expect(clientProxy.send).toHaveBeenCalledWith(
          MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY,
          {},
        );
      });
    });
    context('getPostCategoryById 가 호출 되면,', () => {
      it('존재하는 id를 받아 특정 post-category Data를 조회 한다,', async () => {
        const mockPostCategory = { id: 1, post_category_name: '팀원 모집' };

        jest.spyOn(clientProxy, 'send').mockImplementation(() => of(mockPostCategory));

        const result = await lastValueFrom(await service.getPostCategoryById(mockPostCategory.id));

        expect(result).toEqual(mockPostCategory);

        expect(clientProxy.send).toHaveBeenCalledWith(
          MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY,
          { id: mockPostCategory.id },
        );
      });
      it('존재하지 않는 id를 받아 NotFoundException이 발생한다.', async () => {
        const mockError = new Error(NotFoundException.name);
        const errorId = 999;

        jest.spyOn(clientProxy, 'send').mockImplementation(() => {
          throw mockError;
        });

        expect(service.getPostCategoryById(errorId)).rejects.toThrow(mockError);

        expect(clientProxy.send).toHaveBeenCalledWith(
          MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY,
          { id: errorId },
        );
      });
    });
  });
});
