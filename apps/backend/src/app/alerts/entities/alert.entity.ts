import { randomUUID } from 'crypto';
import { IAlert } from '../alert.interface';

export class AlertEntity implements IAlert {
  id: string = randomUUID();
  fromUserId: string;
  userId: string;
  text: string;
  createdAt: string = new Date().toISOString();

  public static create(item: IAlert): AlertEntity {
    const alert = new AlertEntity();
    Object.assign(alert, item);
    return alert;
  }

  public toObject(): IAlert {
    return {
      id: this.id,
      userId: this.userId,
      text: this.text,
      createdAt: this.createdAt,
    }
  }
}
