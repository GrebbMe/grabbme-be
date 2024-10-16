import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory, PostCategory } from '@publicData/entities';
import { CustomRpcException } from '@shared/filter/custom-rpc-exception';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateBoardDto, UpdateBoardDto } from './dto/req.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(PostCategory)
    private readonly postCategoryRepository: Repository<PostCategory>,
    @InjectRepository(CareerCategory)
    private readonly careerCategoryRepository: Repository<CareerCategory>,
    @InjectRepository(PositionCategory)
    private readonly positionCategoryRepository: Repository<PositionCategory>,
  ) {}

  @Transactional()
  public async getPostsByPostCategoryId(postCategoryId: number): Promise<Board[]> {
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
        'career_category_id',
      ],
      relations: ['post_category_id', 'career_category_id'],
    });

    if (posts.length === 0) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글이 존재하지 않습니다.');
    }

    return posts.map((post) => classToPlain(post) as Board);
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
      relations: ['post_category_id', 'career_category_id'],
    });

    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    return classToPlain(post) as Board;
  }

  @Transactional()
  public async createPost(postCategoryId: number, createBoardDto: CreateBoardDto): Promise<Board> {
    const postCategory = await this.postCategoryRepository.findOne({
      where: { id: postCategoryId },
    });

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
      post_category_id: postCategory,
      career_category_id: careerCategory,
      position_category_id: positionCategory,
    });

    const savedPost = await this.boardRepository.save(newPost);

    return classToPlain(savedPost) as Board;
  }

  @Transactional()
  public async updatePost(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
      relations: ['career_category_id', 'position_category_id'],
    });

    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    if (updateBoardDto.title) {
      post.title = updateBoardDto.title;
    }

    if (updateBoardDto.content) {
      post.content = updateBoardDto.content;
    }

    if (updateBoardDto.expired_at) {
      post.expired_at =
        updateBoardDto.expired_at instanceof Date
          ? updateBoardDto.expired_at
          : new Date(updateBoardDto.expired_at);
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

    const updatedPost = await this.boardRepository.save(post);

    return classToPlain(updatedPost) as unknown as Board;
  }

  @Transactional()
  public async deletePost(id: number): Promise<void> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
    });

    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    await this.boardRepository.remove(post);
  }
}
