import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post_category')
export class PostCategory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'post_category ID' })
  public id: number;

  @Column()
  @ApiProperty({ description: 'post_category name' })
  public post_category_name: string;
}
