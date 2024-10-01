import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Board {
  @PrimaryGeneratedColumn()
  public post_id: number;

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
