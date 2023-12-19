export class UserAddedToFriendsEvent {
  constructor(
    public readonly toUserId: string, 
    public readonly fromUserId: string, 
    public readonly fromUserName: string
  ) {}
}
