import { User } from '@apps/user/src/user/entities/user.entity';
import { PositionCategory } from '@publicData/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn()
  public participants_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user_id: User;

  @ManyToOne(() => Board)
  @JoinColumn({ name: 'post_id' })
  public board: Board;

  @ManyToOne(() => PositionCategory)
  @JoinColumn({ name: 'position_category_id' })
  public positionCategory: PositionCategory;

  @Column({ type: 'varchar', length: 255 })
  public status: string;
}
