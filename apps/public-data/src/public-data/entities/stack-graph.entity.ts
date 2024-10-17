import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stack_graph')
export class StackGraph {
  @PrimaryGeneratedColumn('increment')
  public stack_graph_id: number;

  @Column({ type: 'int' })
  public stack_id: number;

  @Column({ type: 'varchar' })
  public stack_name: string;

  @Column({ type: 'int' })
  public apply_cnt: number;

  @Column({ type: 'int', default: Number(new Date().getFullYear()) })
  public record_year: number;

  @Column({ type: 'int', default: Number(new Date().getMonth() + 1) })
  public record_month: number;
}
