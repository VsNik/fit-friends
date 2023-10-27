import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Training } from '../../trainings/models/training.model';
import { INotify } from '../notify.interface';

@Entity('notifications')
export class Notify implements INotify {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  coachId: string;

  @Column({ type: 'varchar', array: true })
  subscribeEmails: string[];

  @ManyToOne(() => Training)
  @JoinColumn()
  training: Training;

  @Column()
  createdAt: string;
}
