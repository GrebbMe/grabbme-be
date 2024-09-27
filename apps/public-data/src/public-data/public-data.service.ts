import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { PostCategory } from './entities/post-category.entity';

@Injectable()
export class PublicDataService {
  public constructor(
    private dataSource: DataSource,
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>,
  ) {}

  @Transactional()
  public async getPostCategories(): Promise<PostCategory[]> {
    const postCategories = await this.postCategoryRepository.find();

    if (postCategories.length === 0) throw new NotFoundException('데이터가 없습니다.');

    return postCategories;
  }

  @Transactional()
  public async getPostCategoryById(id: number): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne({ where: { id } });

    if (!postCategory) throw new NotFoundException('데이터가 없습니다.');

    return postCategory;
  }
}
