import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PostCategory, PositionCategory } from './entities';

@Injectable()
export class PublicDataService {
  public constructor(
    private dataSource: DataSource,
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>,
    @InjectRepository(PositionCategory)
    private positionCategoryRepository: Repository<PositionCategory>,
  ) {}

  public async getPostCategories(): Promise<PostCategory[]> {
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
      if (!postData) {
        throw new NotFoundException('데이터가 없습니다.');
      }
      await queryRunner.commitTransaction();

      return postData;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    } finally {
      await queryRunner.release();
    }
  }

  public async getPositionCategories(): Promise<PositionCategory[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const positionCategories = await this.positionCategoryRepository.find();

      if (positionCategories.length === 0) {
        throw new NotFoundException('데이터가 없습니다.');
      }
      await queryRunner.commitTransaction();

      return positionCategories;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      return err;
    } finally {
      await queryRunner.release();
    }
  }

  public async getPositionCategoryById(id: number): Promise<PositionCategory> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const positionCategory = await this.positionCategoryRepository.findOne({
        where: { position_category_id: id },
      });

      if (!positionCategory) {
        throw new NotFoundException('포지션 정보가 없습니다.');
      }

      await queryRunner.commitTransaction();

      return positionCategory;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }
}
