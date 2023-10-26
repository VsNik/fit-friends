import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Training } from '../../trainings/models/training.model';
import { IBalance } from '../balance.intrface';

@Entity('balans')
export class Balance implements IBalance {
  @PrimaryColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  userId: string;

  @ManyToOne(() => Training)
  @JoinColumn()
  training: Training;

  @Column({ default: 0 })
  count: number;

  @Column()
  createdAt: string;
}
