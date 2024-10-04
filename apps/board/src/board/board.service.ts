import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  @Transactional()
  public async getPosts(postCategoryId: number): Promise<Board[]> {
    let posts;

    if (postCategoryId) {
      posts = await this.boardRepository.find({
        where: { postCategory: { id: postCategoryId } },
        relations: ['postCategory'],
      });
    } else {
      posts = await this.boardRepository.find({
        relations: ['postCategory'],
      });
    }

    if (posts.length === 0) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    return posts;
  }

  @Transactional()
  public async getPostById(id: number): Promise<Board> {
    const post = await this.boardRepository.findOneBy({ post_id: id });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  @Transactional()
  public async createPost(postCategoryId: number, createBoardDto: CreateBoardDto): Promise<Board> {
    const newPost = this.boardRepository.create({
      title: createBoardDto.title,
      content: createBoardDto.content,
      expired_at: new Date(createBoardDto.expired_at),
      postCategory: { id: postCategoryId },
    });

    const savedPost = await this.boardRepository.save(newPost);
    return savedPost;
  }

  @Transactional()
  public async updatePost(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const post = await this.boardRepository.findOneBy({ post_id: id });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const updatedPost = this.boardRepository.merge(post, updateBoardDto);
    return await this.boardRepository.save(updatedPost);
  }

  @Transactional()
  public async deletePost(id: number): Promise<void> {
    const post = await this.boardRepository.findOneBy({ post_id: id });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    await this.boardRepository.remove(post);
  }
}
