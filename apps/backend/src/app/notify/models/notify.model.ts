import { Column, Entity, PrimaryColumn } from 'typeorm';
import { INotify } from '../notify.interface';

@Entity('notifications')
export class Notify implements INotify {
  @PrimaryColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  coachId: string;

  @Column()
  coachName: string;

  @Column({type: 'varchar', array: true})
  subscribeEmails: string[];

  @Column()
  trainingTitle: string;

  @Column()
  trainingImage: string;

  @Column()
  createdAt: string;
}
