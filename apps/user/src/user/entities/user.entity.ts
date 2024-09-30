import { CareerCategory } from '@publicData/entities/career-category.entity';
import { PositionCategory } from '@publicData/entities/position-category.entity';
import { ProjectCategory } from '@publicData/entities/project-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => PositionCategory, (position) => position.user)
  public position_category_id: PositionCategory;

  @ManyToOne(() => ProjectCategory, (project) => project.user)
  public project_category_id: ProjectCategory;

  @ManyToOne(() => CareerCategory, (career) => career.user)
  public career_category_id: CareerCategory;
}
