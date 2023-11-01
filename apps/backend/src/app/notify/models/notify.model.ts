import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('notifications')
export class Notify {
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
