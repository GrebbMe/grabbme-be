import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('position_category')
export class PositionCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'position_category_id' })
  public position_category_id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  public name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  public kor_name: string;

  @Column({ type: 'varchar', length: 45 })
  public abbreviation: string;
}
