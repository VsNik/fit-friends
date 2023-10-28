import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IAlert } from '../alert.interface';

@Entity('alerts')
export class Alert implements IAlert {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  fromUserId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  text: string;

  @Column()
  createdAt: string;
}
