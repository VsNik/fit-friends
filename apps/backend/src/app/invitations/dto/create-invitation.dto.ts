import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateInvitationDto {
  @IsUUID()
  @IsNotEmpty()
  readonly toUserId: string;
}
