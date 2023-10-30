export class TrainingCreatedEvent {
  constructor(
    public readonly subscribeEmails: string[],
    public readonly coachId: string,
    public readonly coachName: string,
    public readonly trainingTitle: string,
    public readonly trainingImage: string,
  ) {}
}
