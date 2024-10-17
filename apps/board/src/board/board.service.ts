import { User } from '@apps/user/src/user/entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory, PostCategory } from '@publicData/entities';
import { CustomRpcException } from '@shared/filter/custom-rpc-exception';
import { classToPlain } from 'class-transformer';
import { Between, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  CreateParticipantDto,
  CreateBoardDto,
  UpdateBoardDto,
  UpdateParticipantDto,
} from './dto/req.dto';
import { Board, Bookmark, Participant, Team } from './entities';

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(PostCategory)
    private readonly postCategoryRepository: Repository<PostCategory>,
    @InjectRepository(CareerCategory)
    private readonly careerCategoryRepository: Repository<CareerCategory>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(PositionCategory)
    private readonly positionCategoryRepository: Repository<PositionCategory>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  @Transactional()
  public async getPostsByPostCategoryId(payload: {
    postCategoryId: number;
    search?: string;
    stack?: number;
    page: number;
    limit: number;
  }): Promise<{ totalPost: number; posts: Board[] }> {
    const { postCategoryId, search, stack, page = 1, limit = 5 } = payload;

    const queryBuilder = this.boardRepository
      .createQueryBuilder('board')
      .select([
        'board.post_id',
        'board.title',
        'board.content',
        'board.expired_at',
        'board.view_cnt',
        'board.bookmarked_cnt',
        'board.stack_category_id',
        'board.career_category_id',
      ])
      .leftJoinAndSelect('board.post_category_id', 'postCategory')
      .leftJoinAndSelect('board.career_category_id', 'careerCategory')
      .where('board.post_category_id = :postCategoryId', { postCategoryId });

    if (search) {
      queryBuilder.andWhere('(board.title LIKE :search OR board.content LIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (stack) {
      queryBuilder.andWhere('FIND_IN_SET(:stack, board.stack_category_id) > 0', { stack });
    }

    const totalPost = await queryBuilder.getCount();

    queryBuilder.skip((page - 1) * limit).take(limit);

    const posts = await queryBuilder.getMany();

    return {
      totalPost,
      posts,
    };
  }

  @Transactional()
  public async getPostByIdAndCategory(
    id: number,
    expectedCategoryId: number,
    errorMessage: string,
  ): Promise<Board> {
    const rawData = await this.boardRepository
      .createQueryBuilder('post')
      .leftJoin('teams', 'team', 'team.post_id = post.post_id')
      .leftJoin('career_category', 'career', 'career.career_category_id = post.career_category_id')
      .where('post.post_id = :id', { id })
      .select([
        'post.post_id AS post_id',
        'post.post_category_id AS post_category_id',
        'post.title AS title',
        'post.content AS content',
        'post.start_month AS start_month',
        'post.end_month AS end_month',
        'post.create_at AS create_at',
        'post.expired_at AS expired_at',
        'post.view_cnt AS view_cnt',
        'post.bookmarked_cnt AS bookmarked_cnt',
        'post.is_open AS is_open',
        'post.project_category_id AS project_category_id',
        'post.stack_category_id AS stack_category_id',
        'post.chat_cnt AS chat_cnt',
        'team.name AS team_name',
        'career.content AS career_content',
      ])
      .getRawMany();

    if (rawData.length === 0) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    const post = rawData[0];

    if (post.post_category_id !== expectedCategoryId) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, errorMessage);
    }

    post.view_cnt += 1;
    await this.boardRepository
      .createQueryBuilder()
      .update('posts')
      .set({ view_cnt: post.view_cnt })
      .where('post_id = :id', { id })
      .execute();

    const teamName = rawData
      .map((row) => row.team_name)
      .filter((name) => name !== null)
      .join(', ');

    const response = {
      ...post,
      position_name: teamName,
    };

    return classToPlain(response) as Board;
  }

  @Transactional()
  public async getProjectPostById(id: number): Promise<Board> {
    return this.getPostByIdAndCategory(id, 1, '프로젝트 게시글이 아닙니다.');
  }

  @Transactional()
  public async getGrabbzonePostById(id: number): Promise<Board> {
    return this.getPostByIdAndCategory(id, 2, '그렙존 게시글이 아닙니다.');
  }

  @Transactional()
  public async createPost(postCategoryId: number, createBoardDto: CreateBoardDto): Promise<Board> {
    const postCategory = await this.postCategoryRepository.findOne({
      where: { id: postCategoryId },
    });

    if (!postCategory) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '포스트 카테고리를 찾을 수 없습니다.');
    }

    const careerCategory = createBoardDto.career_category_id
      ? await this.careerCategoryRepository.findOne({
          where: { career_category_id: createBoardDto.career_category_id },
        })
      : null;

    const user = await this.userRepository.findOne({
      where: { user_id: createBoardDto.user_id },
    });

    if (!user) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.');
    }

    const newPost = this.boardRepository.create({
      ...createBoardDto,
      post_category_id: postCategory,
      career_category_id: careerCategory,
      user_id: user,
    });

    const savedPost = await this.boardRepository.save(newPost);

    if (createBoardDto.teamsData) {
      for (const teamData of createBoardDto.teamsData) {
        const positionCategory = await this.positionCategoryRepository.findOne({
          where: { position_category_id: teamData.position_category_id },
        });

        if (positionCategory) {
          const newTeam = this.teamRepository.create({
            board: savedPost,
            position_category_id: positionCategory,
            name: positionCategory.kor_name,
            total_cnt: postCategoryId === 2 ? 1 : teamData.total_cnt,
            apply_cnt: postCategoryId === 2 ? 1 : teamData.apply_cnt,
          });

          await this.teamRepository.save(newTeam);
        }
      }
    }

    return classToPlain(savedPost) as Board;
  }

  @Transactional()
  public async updatePost(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const post = await this.boardRepository.findOne({
      where: { post_id: id },
      relations: ['career_category_id'],
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

    if (updateBoardDto.start_month) {
      post.start_month = updateBoardDto.start_month;
    }

    if (updateBoardDto.end_month) {
      post.end_month = updateBoardDto.end_month;
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

    if (updateBoardDto.teamsData) {
      for (const teamData of updateBoardDto.teamsData) {
        const existingTeam = await this.teamRepository.findOne({
          where: { team_id: teamData.team_id },
        });

        if (existingTeam) {
          if (teamData.position_category_id) {
            const newPositionCategory = await this.positionCategoryRepository.findOne({
              where: { position_category_id: teamData.position_category_id },
            });

            if (newPositionCategory) {
              existingTeam.position_category_id = newPositionCategory;
              existingTeam.name = newPositionCategory.kor_name;
            }
          }

          existingTeam.total_cnt = teamData.total_cnt;
          existingTeam.apply_cnt = teamData.apply_cnt;

          await this.teamRepository.save(existingTeam);
        }
      }
    }

    const updatedPost = await this.boardRepository.save(post);

    return classToPlain(updatedPost) as unknown as Board;
  }

  @Transactional()
  public async deletePost(id: number): Promise<boolean> {
    const teamsToDelete = await this.teamRepository.find({
      where: { board: { post_id: id } },
    });

    if (teamsToDelete.length > 0) {
      await this.teamRepository.remove(teamsToDelete);
    }

    const post = await this.boardRepository.findOne({
      where: { post_id: id },
    });

    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    await this.boardRepository.remove(post);

    return true;
  }

  @Transactional()
  public async createParticipant(
    postId: number,
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const post = await this.boardRepository.findOne({ where: { post_id: postId } });
    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    const user = await this.userRepository.findOne({
      where: { user_id: createParticipantDto.user_id },
    });
    if (!user) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.');
    }

    const positionCategory = await this.positionCategoryRepository.findOne({
      where: { position_category_id: createParticipantDto.position_category_id },
    });
    if (!positionCategory) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '포지션 카테고리를 찾을 수 없습니다.');
    }

    const participant = this.participantRepository.create({
      board: post,
      user_id: user,
      position_category_id: positionCategory,
      status: 'pending',
    });
    const savedParticipant = await this.participantRepository.save(participant);

    return classToPlain(savedParticipant) as Participant;
  }

  @Transactional()
  public async updateParticipantStatus(
    postId: number,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<UpdateParticipantDto> {
    const post = await this.boardRepository.findOne({
      where: { post_id: postId },
    });

    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '게시글을 찾을 수 없습니다.');
    }

    const participant = await this.participantRepository.findOne({
      where: { participants_id: updateParticipantDto.participants_id },
    });

    if (!participant) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '참가자를 찾을 수 없습니다.');
    }

    participant.status = updateParticipantDto.status;

    await this.participantRepository.save(participant);

    return updateParticipantDto;
  }

  @Transactional()
  public async getApplyByParticipant(postId: number): Promise<Participant[]> {
    const participants = await this.participantRepository.find({
      where: { board: { post_id: postId } },
      relations: ['user_id', 'position_category_id'],
    });

    if (participants.length === 0) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '해당 게시글에 참가자가 없습니다.');
    }

    return participants.map((participant) => classToPlain(participant) as Participant);
  }

  @Transactional()
  public async createBookmark({ userId, postId }: { userId: number; postId: number }) {
    const bookmark = await this.bookmarkRepository.create({
      user_id: userId,
      post_id: postId,
    });

    const savedBookmark = await this.bookmarkRepository.save(bookmark);

    await this.increasePostBookmarkedCnt(postId);

    return classToPlain(savedBookmark) as Bookmark;
  }

  @Transactional()
  public async deleteBookmark({ userId, postId }: { userId: number; postId: number }) {
    const bookmark = await this.bookmarkRepository.findOneBy({
      user_id: userId,
      post_id: postId,
    });

    if (!bookmark) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '북마크를 찾을 수 없습니다.');
    }

    await this.decreasePostBookmarkedCnt(postId);

    return await this.bookmarkRepository.remove(bookmark);
  }

  public async increasePostBookmarkedCnt(postId: number) {
    const post = await this.boardRepository.findOneBy({ post_id: postId });

    post.bookmarked_cnt += 1;

    return await this.boardRepository.save(post);
  }

  public async decreasePostBookmarkedCnt(postId: number) {
    const post = await this.boardRepository.findOneBy({ post_id: postId });

    if (!post) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '북마크를 찾을 수 없습니다.');
    }

    post.bookmarked_cnt = Math.max(0, post.bookmarked_cnt - 1);

    return await this.boardRepository.save(post);
  }

  public async getBookmarksByUserEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    console.log('user 아이디', user.user_id);
    if (!user) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.');
    }

    const bookmarks = await this.bookmarkRepository.find({
      where: { user_id: user.user_id },
    });
    console.log(bookmarks);
    if (bookmarks.length === 0) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '북마크한 게시글이 없습니다.');
    }

    return bookmarks.map((bookmark) => classToPlain(bookmark) as Bookmark);
  }

  public async getPopularProjects() {
    const popularProjects = await this.boardRepository.find({
      order: { bookmarked_cnt: 'DESC', view_cnt: 'DESC', chat_cnt: 'DESC' },
      take: 4,
    });

    return popularProjects.map((project) => classToPlain(project) as Board);
  }

  public async getClosingProjects() {
    let expireExpectedProjects;
    const currentDate = new Date();
    const dueDate = new Date(new Date().setDate(new Date().getDate() + 7));

    console.log('currentDate', currentDate);
    console.log('dueDate', dueDate);

    const closingProjects = await this.boardRepository.find({
      where: {
        expired_at: Between(currentDate, dueDate),
        is_open: true,
        post_category_id: { id: 1 } as PostCategory,
      },
      take: 4,
    });

    if (closingProjects.length === 0) {
      expireExpectedProjects = await this.boardRepository.find({
        order: { expired_at: 'ASC' },
        where: {
          is_open: true,
          post_category_id: { id: 1 } as PostCategory,
        },
        take: 4,
      });
    }

    return closingProjects.length > 0
      ? closingProjects.map(
          (project) =>
            classToPlain({
              ...project,
              due_day: Math.floor(
                (project.expired_at.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
              ),
            }) as Board,
        )
      : expireExpectedProjects.map(
          (project) =>
            classToPlain({
              ...project,
              due_day: Math.floor(
                (project.expired_at.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
              ),
            }) as Board,
        );
  }
}
