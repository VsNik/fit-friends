export class InviteStatusChangedEvent {
  constructor(
    public readonly fromUserId: string,
    public readonly fromUserName: string,
    public readonly toUserId: string,
    public readonly status: string,
  ) {}
}
