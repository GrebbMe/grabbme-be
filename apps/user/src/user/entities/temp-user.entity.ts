import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//* 무분별한 회원가입을 막기 위한 Table
@Entity('temp_users')
export class TempUser {
  @PrimaryGeneratedColumn()
  public temp_id: number;

  @Column('varchar', { length: 255, nullable: false })
  public nickname: string;

  @Column('varchar', { length: 255, unique: true, nullable: false })
  public email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}
