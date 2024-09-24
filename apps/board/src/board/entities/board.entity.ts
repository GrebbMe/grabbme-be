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

  // @ManyToOne(()=>users)
  // @JoinColumn({name:'user_id'})
  // public user: User;

  // @ManyToOne(()=>teams)
  // @JoinColumn({name:'team_id'})
  // public team: Team;

  // @ManyToOne(() => PostCategory)
  // @JoinColumn({name:'post_category_id'})
  // public postCategory : PostCategory;

  // @ManyToOne(() => ProjectCategory)
  // @JoinColumn({name:'project_category_id'})
  // public projectCategory : ProjectCategory;

  // @ManyToOne(() => JobCategory)
  // @JoinColumn({name:'job_category_id'})
  // public jobCategory : JobCategory;

  // @ManyToOne(() => StackCategory)
  // @JoinColumn({name:'stack_category_id'})
  // public stackCategory : StackCategory;

  // @ManyToOne(() => CareerCategory)
  // @JoinColumn({name:'career_category_id'})
  // public careerCategory : CareerCategory;

  // @ManyToOne(() => Attachment)
  // @JoinColumn({name:'attachment_id'})
  // public attachment : Attachment;
}
