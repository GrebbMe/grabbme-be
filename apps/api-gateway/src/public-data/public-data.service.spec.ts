import { NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { PublicDataService } from './public-data.service';

describe('PublicDataService', () => {
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

  it('모듈 정의', () => {
    expect(service).toBeDefined();
  });

  it('전체 post_category 데이터 조회', async () => {
    const mockPostData = [{ id: 1, post_category_name: '팀원 모집' }];
    jest.spyOn(clientProxy, 'send').mockImplementation(() => of(mockPostData));

    const result = await firstValueFrom(service.getPostData());
    expect(result).toEqual(mockPostData);
    expect(clientProxy.send).toHaveBeenCalledWith({ cmd: 'get-post-data' }, {});
  });

  it('특정 post_category 데이터 조회', async () => {
    const mockPostData = { id: 1, post_category_name: '팀원 모집' };
    jest.spyOn(clientProxy, 'send').mockImplementation(() => of(mockPostData));

    const result = await lastValueFrom(service.getOnePostData(1));
    expect(result).toEqual(mockPostData);
    expect(clientProxy.send).toHaveBeenCalledWith({ cmd: 'get-one-post-data' }, { id: 1 });
  });

  it('전체 post_category 데이터 조회 에러', async () => {
    const mockError = new Error(NotFoundException.name);
    jest.spyOn(clientProxy, 'send').mockImplementation(() => throwError(() => mockError));

    try {
      await firstValueFrom(service.getPostData());
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(clientProxy.send).toHaveBeenCalledWith({ cmd: 'get-post-data' }, {});
  });

  it('특정 post_category 데이터 조회 에러', async () => {
    const mockError = new Error(NotFoundException.name);
    jest.spyOn(clientProxy, 'send').mockImplementation(() => throwError(() => mockError));

    try {
      await firstValueFrom(service.getOnePostData(999));
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(clientProxy.send).toHaveBeenCalledWith({ cmd: 'get-one-post-data' }, { id: 999 });
  });
});
