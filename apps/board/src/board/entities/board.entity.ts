import { CareerCategory, PositionCategory, PostCategory } from '@publicData/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Board {
  @PrimaryGeneratedColumn()
  public post_id: number;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'text' })
  public content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public create_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  public update_at: Date;

  @Column({ type: 'timestamp' })
  public expired_at: Date;

  @Column({ type: 'int', default: 0 })
  public view_cnt: number;

  @Column({ type: 'int', default: 0 })
  public bookmarked_cnt: number;

  @Column({ type: 'boolean', default: true })
  public is_open: boolean;

  @ManyToOne(() => PostCategory)
  @JoinColumn({ name: 'post_category_id' })
  public post_category_id: PostCategory;

  @ManyToOne(() => CareerCategory, { nullable: true })
  @JoinColumn({ name: 'career_category_id' })
  public career_category_id?: CareerCategory;

  @ManyToOne(() => PositionCategory, { nullable: true })
  @JoinColumn({ name: 'position_category_id' })
  public position_category_id?: PositionCategory;

  @Column('simple-array')
  public project_category_id: number[];

  @Column('simple-array')
  public stack_category_id: number[];
}
