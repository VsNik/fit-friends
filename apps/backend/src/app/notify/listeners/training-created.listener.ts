import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TrainingCreatedEvent } from '../../trainings/events/training-created.event';
import { NotifyService } from '../notify.service';
import { AppEvent } from '@fit-friends/libs/constants';

@Injectable()
export class TrainingCreatedListener {
  constructor(private readonly notifyService: NotifyService) {}

  @OnEvent(AppEvent.TrainingCreated)
  async handleTrainingCreatedEvent(event: TrainingCreatedEvent) {
    await this.notifyService.create(event);
  }
}
