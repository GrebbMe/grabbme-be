import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apply_graph')
export class ApplyGraph {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Transform(({ value }) => (value ? value.toISOString().split('T')[0] : null))
  public record_data: Date;

  @Column({ type: 'int' })
  public apply_cnt: number;
}
