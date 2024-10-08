import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerCategory,
  PositionCategory,
  ProjectCategory,
  StackCategory,
} from '@publicData/entities';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateBoardDto, UpdateBoardDto } from './dto/req.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(ProjectCategory)
    private readonly projectCategoryRepository: Repository<ProjectCategory>,

    @InjectRepository(StackCategory)
    private readonly stackCategoryRepository: Repository<StackCategory>,

    @InjectRepository(CareerCategory)
    private readonly careerCategoryRepository: Repository<CareerCategory>,

    @InjectRepository(PositionCategory)
    private readonly positionCategoryRepository: Repository<PositionCategory>,
  ) {}

  @Transactional()
  public async getPostsByPostCategory(postCategoryId: number): Promise<Board[]> {
    if (!postCategoryId) {
      throw new NotFoundException('유효한 postCategoryId를 입력해주세요.');
    }

    const posts = await this.boardRepository.find({
      where: { postCategory: { id: postCategoryId } },
      select: [
        'post_id',
        'title',
        'content',
        'view_cnt',
        'bookmarked_cnt',
        'create_at',
        'update_at',
        'expired_at',
        'is_open',
      ],
      relations: ['postCategory', 'stackCategories', 'careerCategory'],
    });

    if (posts.length === 0) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return posts;
  }

  @Transactional()
  public async getPostById(id: number): Promise<Board> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
      select: [
        'post_id',
        'title',
        'content',
        'view_cnt',
        'bookmarked_cnt',
        'create_at',
        'update_at',
        'expired_at',
        'is_open',
      ],
      relations: [
        'postCategory',
        'projectCategories',
        'stackCategories',
        'positionCategory',
        'careerCategory',
      ],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  @Transactional()
  public async createPost(postCategoryId: number, createBoardDto: CreateBoardDto): Promise<Board> {
    const projectCategories = await this.projectCategoryRepository.findByIds(
      createBoardDto.project_category_id,
    );

    const stackCategories = await this.stackCategoryRepository.findByIds(
      createBoardDto.stack_category_id,
    );

    const careerCategory = createBoardDto.career_category_id
      ? await this.careerCategoryRepository.findOne({
          where: { career_category_id: createBoardDto.career_category_id },
        })
      : null;

    const positionCategory = createBoardDto.position_category_id
      ? await this.positionCategoryRepository.findOne({
          where: { position_category_id: createBoardDto.position_category_id },
        })
      : null;

    const newPost = this.boardRepository.create({
      title: createBoardDto.title,
      content: createBoardDto.content,
      expired_at: createBoardDto.expired_at ? new Date(createBoardDto.expired_at) : null,
      postCategory: { id: postCategoryId },
      projectCategories: projectCategories,
      stackCategories: stackCategories,
      careerCategory: careerCategory,
      positionCategory: positionCategory,
    });

    return await this.boardRepository.save(newPost);
  }

  @Transactional()
  public async updatePost(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
      relations: ['projectCategories', 'stackCategories', 'careerCategory', 'positionCategory'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    if (updateBoardDto.project_category_id) {
      const projectCategories = await this.projectCategoryRepository.findByIds(
        updateBoardDto.project_category_id,
      );
      post.projectCategories = projectCategories;
    }

    if (updateBoardDto.stack_category_id) {
      const stackCategories = await this.stackCategoryRepository.findByIds(
        updateBoardDto.stack_category_id,
      );
      post.stackCategories = stackCategories;
    }

    if (updateBoardDto.career_category_id) {
      const careerCategory = await this.careerCategoryRepository.findOne({
        where: { career_category_id: updateBoardDto.career_category_id },
      });
      post.careerCategory = careerCategory || null;
    }

    if (updateBoardDto.position_category_id) {
      const positionCategory = await this.positionCategoryRepository.findOne({
        where: { position_category_id: updateBoardDto.position_category_id },
      });
      post.positionCategory = positionCategory || null;
    }

    this.boardRepository.merge(post, updateBoardDto);

    return await this.boardRepository.save(post);
  }

  @Transactional()
  public async deletePost(id: number): Promise<void> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    await this.boardRepository.remove(post);
  }
}
