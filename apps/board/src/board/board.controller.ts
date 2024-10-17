import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SetResponse } from '@shared/decorator/set-response.decorator';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { TransformInterceptor } from '@shared/interceptor/transform.interceptor';
import { MESSAGE } from 'shared/constants/message-pattern';
import { BoardService } from './board.service';
import {
  CreateParticipantDto,
  CreateBoardDto,
  UpdateBoardDto,
  UpdateParticipantDto,
} from './dto/req.dto';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @SetResponse(MESSAGE.POST.GET_ALL_POST_BY_POST_CATEGORY_ID.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.GET_ALL_POST_BY_POST_CATEGORY_ID)
  public async getPostsByPostCategoryId(
    @Payload()
    payload: {
      postCategoryId: number;
      search?: string;
      stack?: number;
      page: number;
      limit: number;
    },
  ) {
    const { postCategoryId, search, stack, page, limit } = payload;
    return this.boardService.getPostsByPostCategoryId({
      postCategoryId,
      search,
      stack,
      page,
      limit,
    });
  }

  @SetResponse(MESSAGE.POST.GET_ONE_POST_BY_GRABBZONE.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.GET_ONE_POST_BY_GRABBZONE)
  public async getGrabbzonePostById(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.getGrabbzonePostById(id);
  }

  @SetResponse(MESSAGE.POST.GET_ONE_POST_BY_PROJECT.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.GET_ONE_POST_BY_PROJECT)
  public async getProjectPostById(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.getProjectPostById(id);
  }

  @SetResponse(MESSAGE.POST.CREATE_POST.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.POST.CREATE_POST)
  public async createPost(
    @Payload() payload: { postCategoryId: number; createBoardDto: CreateBoardDto },
  ) {
    const { postCategoryId, createBoardDto } = payload;
    return this.boardService.createPost(postCategoryId, createBoardDto);
  }

  @SetResponse(MESSAGE.POST.UPDATE_POST.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.UPDATE_POST)
  public async updatePost(@Payload() payload: { id: number; updateBoardDto: UpdateBoardDto }) {
    const { id, updateBoardDto } = payload;
    return this.boardService.updatePost(id, updateBoardDto);
  }

  @SetResponse(MESSAGE.POST.DELETE_POST.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.DELETE_POST)
  public async deletePost(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.deletePost(id);
  }

  @SetResponse(MESSAGE.PARTICIPANT.CREATE_PARTICIPANT.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.PARTICIPANT.CREATE_PARTICIPANT)
  public async createParticipant(
    @Payload() payload: { postId: number; createParticipantDto: CreateParticipantDto },
  ) {
    const { postId, createParticipantDto } = payload;
    return this.boardService.createParticipant(postId, createParticipantDto);
  }

  @SetResponse(MESSAGE.PARTICIPANT.UPDATE_PARTICIPANT_STATUS.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PARTICIPANT.UPDATE_PARTICIPANT_STATUS)
  public async updateParticipantStatus(
    @Payload() payload: { postId: number; updateParticipantDto: UpdateParticipantDto },
  ) {
    const { postId, updateParticipantDto } = payload;
    return this.boardService.updateParticipantStatus(postId, updateParticipantDto);
  }

  @SetResponse(MESSAGE.PARTICIPANT.GET_PARTICIPANTS_BY_POST.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PARTICIPANT.GET_PARTICIPANTS_BY_POST)
  public async getApplyByParticipant(@Payload() payload: { postId: number }) {
    const { postId } = payload;
    return this.boardService.getApplyByParticipant(postId);
  }

  @SetResponse(MESSAGE.POST.CREATE_BOOKMARK.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.POST.CREATE_BOOKMARK)
  public async createBookmark(@Payload() payload: { userId: number; postId: number }) {
    const { userId, postId } = payload;
    return await this.boardService.createBookmark({ userId, postId });
  }

  @SetResponse(MESSAGE.POST.DELETE_BOOKMARK.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.DELETE_BOOKMARK)
  public async deleteBookmark(@Payload() payload: { userId: number; postId: number }) {
    const { userId, postId } = payload;
    return await this.boardService.deleteBookmark({ userId, postId });
  }

  @SetResponse(MESSAGE.POST.GET_BOOKMARKS_BY_EMAIL.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.GET_BOOKMARKS_BY_EMAIL)
  public async getBookmarksByUserEmail(@Payload() payload: { email: string }) {
    const { email } = payload;
    return await this.boardService.getBookmarksByUserEmail(email);
  }
}
