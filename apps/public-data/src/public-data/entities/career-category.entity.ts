import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('career_category')
export class CareerCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'career_category_id' })
  public career_category_id: number;

  @Column({ type: 'varchar', length: 255 })
  public content: string;
}
