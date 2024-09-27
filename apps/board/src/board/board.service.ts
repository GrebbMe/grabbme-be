import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly dataSource: DataSource,
  ) {}

  public async getPosts(): Promise<Board[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const boards = await this.boardRepository.find();
      await queryRunner.commitTransaction();
      return boards;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async getPostById(id: number): Promise<Board> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const board = await this.boardRepository.findOneBy({ post_id: id });
      if (!board) {
        throw new Error('게시글을 찾을 수 없습니다.');
      }
      await queryRunner.commitTransaction();
      return board;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async createPost(data: CreateBoardDto): Promise<Board> {
    const newBoardData = {
      title: data.title,
      content: data.content,
      expired_at: new Date(data.expired_at),
    };
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const newBoard = this.boardRepository.create(newBoardData);
      const savedBoard = await queryRunner.manager.save(newBoard);
      await queryRunner.commitTransaction();
      return savedBoard;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async updatePost(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const board = await this.boardRepository.findOneBy({ post_id: id });
      if (!board) {
        throw new Error('게시글을 찾을 수 없습니다.');
      }

      const updatedBoard = this.boardRepository.merge(board, updateBoardDto);
      const savedBoard = await queryRunner.manager.save(updatedBoard);
      await queryRunner.commitTransaction();
      return savedBoard;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async deletePost(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const board = await this.boardRepository.findOneBy({ post_id: id });
      if (!board) {
        throw new Error('게시글을 찾을 수 없습니다.');
      }

      await queryRunner.manager.remove(Board, board);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
