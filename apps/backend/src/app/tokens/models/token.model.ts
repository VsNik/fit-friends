import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IToken } from '../token.interface';

@Entity('tokens')
export class Token implements IToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  sessionId: string;

  @Column()
  expiresTo: Date;

  @CreateDateColumn()
  createdAt: Date;
}
