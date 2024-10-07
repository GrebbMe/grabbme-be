import {
  CareerCategory,
  PositionCategory,
  PostCategory,
  ProjectCategory,
  StackCategory,
} from '@publicData/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Board {
  @PrimaryGeneratedColumn()
  public post_id: number;

  @ManyToOne(() => PostCategory)
  @JoinColumn({ name: 'post_category_id' })
  public postCategory: PostCategory;

  @ManyToOne(() => CareerCategory, { nullable: true })
  @JoinColumn({ name: 'career_category_id' })
  public careerCategory?: CareerCategory;

  @ManyToOne(() => PositionCategory, { nullable: true })
  @JoinColumn({ name: 'position_category_id' })
  public positionCategory?: PositionCategory;

  @ManyToMany(() => ProjectCategory)
  @JoinTable({ name: 'posts_project_category_relation' })
  public projectCategories: ProjectCategory[];

  @ManyToMany(() => StackCategory)
  @JoinTable({ name: 'posts_stack_category_relation' })
  public stackCategories: StackCategory[];

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'text' })
  public content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  public update_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public create_at: Date;

  @Column({ type: 'timestamp' })
  public expired_at: Date;

  @Column({ type: 'int', default: 0 })
  public view_cnt: number;

  @Column({ type: 'int', default: 0 })
  public bookmarked_cnt: number;

  @Column({ type: 'boolean', default: true })
  public is_open: boolean;
}
