import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('alerts')
export class Alert {
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
