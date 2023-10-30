import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '@fit-friends/libs/types';
import { InvitationsService } from './invitations.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserId } from '../auth/decorators/user-id.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeStatusDto } from './dto/change-status.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() { toUserId }: CreateInvitationDto, @UserId() initiatorId: string) {
    await this.invitationsService.create(toUserId, initiatorId);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async changeStatus(@Param('id') invitationId: string, @Body() { status }: ChangeStatusDto, @UserId() userId: string) {
    await this.invitationsService.changeStatus(invitationId, status, userId);
  }
}
