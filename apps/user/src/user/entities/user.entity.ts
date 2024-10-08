import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => PositionCategory, { eager: true })
  @JoinColumn({ name: 'position_category_id' })
  public position_category_id: PositionCategory;

  @ManyToOne(() => ProjectCategory, { eager: true })
  @JoinColumn({ name: 'project_category_id' })
  public project_category_id: ProjectCategory;

  @ManyToOne(() => CareerCategory, { eager: true })
  @JoinColumn({ name: 'career_category_id' })
  public career_category_id: CareerCategory;
}
