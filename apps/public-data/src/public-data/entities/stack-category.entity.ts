import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stack_category')
export class StackCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'stack_category_id' })
  public stack_category_id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'varchar', length: 45 })
  public kor_name: string;

  @Column({ type: 'varchar', length: 45 })
  public category: string;
}
