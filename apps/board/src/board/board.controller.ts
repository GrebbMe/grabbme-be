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
  public async getPostsByPostCategoryId(@Payload() payload: { postCategoryId: number }) {
    const { postCategoryId } = payload;
    return this.boardService.getPostsByPostCategoryId(postCategoryId);
  }

  @SetResponse(MESSAGE.POST.GET_ONE_POST.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.POST.GET_ONE_POST)
  public async getPostById(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.getPostById(id);
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
}
