import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// TODO: public data의 경로가 alias로 세팅되기로 함
// public data 구현 완료시 아래 import alias 확인하고 수정
import { PositionCategory } from '@apps/public-data/src/public-data/entities/position-category.entity';
import { ProjectCategory } from '@apps/public-data/src/public-data/entities/project-category.entity';
import { CareerCategory } from '@apps/public-data/src/public-data/entities/Career-category.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public user_id: number;

  @Column('varchar', { length: 255, unique: true, nullable: false })
  public nickname: string;

  @Column('varchar', { length: 255, unique: true, nullable: false })
  public email: string;

  @Column('simple-array')
  public stack_category_id: number[];

  @ManyToOne(() => PositionCategory, (position) => position.position_category_id)
  public position_category_id: PositionCategory[];

  @ManyToOne(() => ProjectCategory, (project) => project.project_category_id)
  public project_category_id: ProjectCategory[];

  @ManyToOne(() => CareerCategory, (career) => career.career_category_id)
  public career_category_id: CareerCategory[];
}
