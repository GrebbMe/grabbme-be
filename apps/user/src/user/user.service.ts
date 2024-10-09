import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { CustomRpcException } from '@shared/filter/custom-rpc-exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDto } from './dto/req.dto';
import { TempUser } from './entities/temp-user.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PositionCategory)
    private positionRepository: Repository<PositionCategory>,
    @InjectRepository(ProjectCategory)
    private projectRepository: Repository<ProjectCategory>,
    @InjectRepository(CareerCategory)
    private careerRepository: Repository<CareerCategory>,
    @InjectRepository(TempUser)
    private tempUserRepository: Repository<TempUser>,
  ) {}

  @Transactional()
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    let positionCategory, careerCategory;

    if (createUserDto.position_category_id !== null && createUserDto.position_category_id !== 0) {
      positionCategory = await this.positionRepository.findOne({
        where: { position_category_id: createUserDto.position_category_id },
      });
    }

    if (createUserDto.career_category_id !== null && createUserDto.career_category_id !== 0) {
      careerCategory = await this.careerRepository.findOne({
        where: { career_category_id: createUserDto.career_category_id },
      });
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      position_category_id: positionCategory?.position_category_id ?? null,
      career_category_id: careerCategory?.career_category_id ?? null,
      project_category_id:
        createUserDto.project_category_id.length > 0 ? createUserDto.project_category_id : [],
      stack_category_id:
        createUserDto.stack_category_id.length > 0 ? createUserDto.stack_category_id : [],
    });

    const deleteTempUser = await this.deleteTempUser(createUserDto.email);

    if (deleteTempUser) {
      return this.userRepository.save(newUser);
    } else {
      throw new CustomRpcException(HttpStatus.BAD_REQUEST, '임시 유저 삭제 실패');
    }
  }

  @Transactional()
  public async loginOrCreateUser(email: string, nickname: string) {
    const user = await this.userRepository.findOneBy({ email });
    let tempUser = await this.tempUserRepository.findOneBy({ email });

    if (user !== null) {
      // * 유저가 회원인 경우
      return {
        isExist: true,
        ...user,
      };
    }

    if (user === null && tempUser === null) {
      // * 유저가 처음 회원가입 하는 경우
      tempUser = await this.createTempUser(email, nickname);

      return {
        isExist: false,
        email: tempUser.email,
        nickname: tempUser.nickname,
      };
    }

    if (user === null && tempUser !== null) {
      // * 유저가 회원가입을 완료하지 않은 경우

      return {
        isExist: false,
        email: tempUser.email,
        nickname: tempUser.nickname,
      };
    }
  }

  @Transactional()
  public async createTempUser(email: string, nickname: string) {
    const newTempUser = this.tempUserRepository.create({
      email,
      nickname,
    });

    return this.tempUserRepository.save(newTempUser);
  }

  public async deleteTempUser(email: string) {
    const tempUser = await this.tempUserRepository.findOneBy({ email });
    console.log('템프 유저', tempUser);

    return this.tempUserRepository.delete(tempUser);
  }

  @Transactional()
  public async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
