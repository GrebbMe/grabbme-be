import { PositionCategory } from '@publicData/entities';
import { IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  public team_id: number;

  @Column({ type: 'varchar', length: 255, default: '그렙팀' })
  @IsOptional()
  public name?: string;

  @Column({ type: 'int', default: 0 })
  public total_cnt: number;

  @Column({ type: 'int', default: 0 })
  public apply_cnt: number;

  @ManyToOne(() => Board)
  @JoinColumn({ name: 'post_id' })
  public board: Board;

  @ManyToOne(() => PositionCategory, { nullable: true })
  @JoinColumn({ name: 'position_category_id' })
  public position_category_id?: PositionCategory;
}
