import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory } from '@publicData/entities';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateBoardDto, UpdateBoardDto } from './dto/req.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(CareerCategory)
    private readonly careerCategoryRepository: Repository<CareerCategory>,
    @InjectRepository(PositionCategory)
    private readonly positionCategoryRepository: Repository<PositionCategory>,
  ) {}

  @Transactional()
  public async getPostsByPostCategoryId(postCategoryId: number): Promise<Board[]> {
    if (!postCategoryId) {
      throw new NotFoundException('유효한 postCategoryId를 입력해주세요.');
    }

    const posts = await this.boardRepository.find({
      where: { post_category_id: { id: postCategoryId } },
      select: [
        'post_id',
        'title',
        'content',
        'expired_at',
        'view_cnt',
        'bookmarked_cnt',
        'stack_category_id',
      ],
      relations: ['post_category_id'],
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
        'create_at',
        'expired_at',
        'view_cnt',
        'bookmarked_cnt',
        'is_open',
        'project_category_id',
        'stack_category_id',
      ],
      relations: ['post_category_id', 'career_category_id', 'position_category_id'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  @Transactional()
  public async createPost(postCategoryId: number, createBoardDto: CreateBoardDto): Promise<Board> {
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
      ...createBoardDto,
      post_category_id: { id: postCategoryId },
      career_category_id: careerCategory,
      position_category_id: positionCategory,
    });
    return await this.boardRepository.save(newPost);
  }

  @Transactional()
  public async updatePost(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
      relations: ['career_category_id', 'position_category_id'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    if (updateBoardDto.title) {
      post.title = updateBoardDto.title;
    }

    if (updateBoardDto.content) {
      post.content = updateBoardDto.content;
    }

    if (updateBoardDto.expired_at) {
      post.expired_at = updateBoardDto.expired_at;
    }

    if (updateBoardDto.project_category_id) {
      post.project_category_id = updateBoardDto.project_category_id;
    }

    if (updateBoardDto.stack_category_id) {
      post.stack_category_id = updateBoardDto.stack_category_id;
    }

    if (updateBoardDto.career_category_id) {
      const careerCategory = await this.careerCategoryRepository.findOne({
        where: { career_category_id: updateBoardDto.career_category_id },
      });
      post.career_category_id = careerCategory || null;
    }

    if (updateBoardDto.position_category_id) {
      const positionCategory = await this.positionCategoryRepository.findOne({
        where: { position_category_id: updateBoardDto.position_category_id },
      });
      post.position_category_id = positionCategory || null;
    }

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
