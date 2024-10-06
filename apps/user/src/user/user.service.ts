import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { CustomRpcException } from '@shared/filter/custom-rpc-exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDto } from './dto/req.dto';
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
  ) {}

  @Transactional()
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const positionCategory = await this.positionRepository.findOne({
      where: { position_category_id: createUserDto.position_category_id },
    });
    const projectCategory = await this.projectRepository.findOne({
      where: { project_category_id: createUserDto.project_category_id },
    });
    const careerCategory = await this.careerRepository.findOne({
      where: { career_category_id: createUserDto.career_category_id },
    });

    const newUser = this.userRepository.create({
      ...createUserDto,
      position_category_id: positionCategory,
      project_category_id: projectCategory,
      career_category_id: careerCategory,
    });
    return this.userRepository.save(newUser);
  }

  @Transactional()
  public async getUser(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (!user) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '데이터가 없습니다.');
    }

    return user;
  }

  @Transactional()
  public async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete({ user_id: id });

    if (result.affected === 0) {
      throw new CustomRpcException(HttpStatus.NOT_FOUND, '데이터가 없습니다.');
    }

    return result.affected && true;
  }
}
