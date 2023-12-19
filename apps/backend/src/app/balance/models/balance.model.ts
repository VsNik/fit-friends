import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Training } from '../../trainings/models/training.model';

@Entity('balans')
export class Balance {
  @PrimaryColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  userId: string;

  @ManyToOne(() => Training)
  @JoinColumn()
  training: Training;

  @Column({ default: 0 })
  count: number;

  @Column({default: false})
  isActive: boolean;

  @Column()
  createdAt: string;
}
