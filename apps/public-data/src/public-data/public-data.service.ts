import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PostCategory } from './entities/post-category.entity';

@Injectable()
export class PublicDataService {
  public constructor(
    private dataSource: DataSource,
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>,
  ) {}

  public async getAllPostCategory(): Promise<PostCategory[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const postDatas = await this.postCategoryRepository.find();
      await queryRunner.commitTransaction();

      return postDatas;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async getPostCategoryById(id: number): Promise<PostCategory> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const postData = await this.postCategoryRepository.findOne({ where: { id } });
      await queryRunner.commitTransaction();

      return postData;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    } finally {
      await queryRunner.release();
    }
  }
}
