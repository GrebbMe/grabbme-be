import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project_category')
export class ProjectCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'project_category_id' })
  public project_category_id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'varchar', length: 255 })
  public kor_name: string;

  @Column({ type: 'varchar', length: 100 })
  public description: string;
}
