import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerCategory,
  PositionCategory,
  PostCategory,
  ProjectCategory,
  StackCategory,
} from '@publicData/entities';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class PublicDataService {
  public constructor(
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>,
    @InjectRepository(PositionCategory)
    private positionCategoryRepository: Repository<PositionCategory>,
    @InjectRepository(ProjectCategory)
    private projectCategoryRepository: Repository<ProjectCategory>,
    @InjectRepository(StackCategory)
    private stackCategoryRepository: Repository<StackCategory>,
    @InjectRepository(CareerCategory)
    private careerCategoryRepository: Repository<CareerCategory>,
  ) {}

  @Transactional()
  public async findAllPostCategory(): Promise<PostCategory[]> {
    const postCategories = await this.postCategoryRepository.find();

    if (postCategories.length === 0) throw new NotFoundException('데이터가 없습니다.');

    return postCategories;
  }

  @Transactional()
  public async findPostCategoryById(id: number): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne({ where: { id } });

    if (!postCategory) throw new NotFoundException('데이터가 없습니다.');

    return postCategory;
  }

  @Transactional()
  public async findAllPositionCategory(): Promise<PositionCategory[]> {
    const positionCategories = await this.positionCategoryRepository.find();

    if (positionCategories.length === 0) throw new NotFoundException('데이터가 없습니다.');

    return positionCategories;
  }

  @Transactional()
  public async findPositionCategoryById(id: number): Promise<PositionCategory> {
    const positionCategory = await this.positionCategoryRepository.findOne({
      where: { position_category_id: id },
    });

    if (!positionCategory) throw new NotFoundException('데이터가 없습니다.');

    return positionCategory;
  }

  @Transactional()
  public async findAllProjectCategory(): Promise<ProjectCategory[]> {
    const projectCategories = await this.projectCategoryRepository.find();

    if (projectCategories.length === 0) throw new NotFoundException('데이터가 없습니다.');

    return projectCategories;
  }

  @Transactional()
  public async findProjectCategoryById(id: number): Promise<ProjectCategory> {
    const projectCategory = await this.projectCategoryRepository.findOne({
      where: { project_category_id: id },
    });
    if (!projectCategory) throw new NotFoundException('데이터가 없습니다.');

    return projectCategory;
  }

  @Transactional()
  public async findAllStackCategory(): Promise<StackCategory[]> {
    const stackCategories = await this.stackCategoryRepository.find();

    if (stackCategories.length === 0) throw new NotFoundException('데이터가 없습니다.');

    return stackCategories;
  }

  @Transactional()
  public async findStackCategoryById(id: number): Promise<StackCategory> {
    const stackCategory = await this.stackCategoryRepository.findOne({
      where: { stack_category_id: id },
    });

    if (!stackCategory) throw new NotFoundException('데이터가 없습니다.');

    return stackCategory;
  }

  @Transactional()
  public async findAllCareerCategory(): Promise<CareerCategory[]> {
    const careerCategories = await this.careerCategoryRepository.find();

    if (careerCategories.length === 0) throw new NotFoundException('데이터가 없습니다.');

    return careerCategories;
  }

  @Transactional()
  public async findCareerCategoryById(id: number): Promise<CareerCategory> {
    const careerCategory = await this.careerCategoryRepository.findOne({
      where: { career_category_id: id },
    });

    if (!careerCategory) throw new NotFoundException('데이터가 없습니다.');

    return careerCategory;
  }
}
