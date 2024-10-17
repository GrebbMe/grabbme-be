import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn('increment')
  public bookmark_id: number;

  @Column({ type: 'int' })
  public user_id: number;

  @Column({ type: 'int' })
  public post_id: number;
}
