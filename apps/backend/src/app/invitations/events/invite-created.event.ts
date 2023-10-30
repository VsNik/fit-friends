export class InviteCreatedEvent {
  constructor(
    public readonly initiatorId: string, 
    public readonly initiatorName: string, 
    public readonly toUserId: string
  ) {}
}
