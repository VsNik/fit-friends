import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '@fit-friends/libs/types';
import { InvitationsService } from './invitations.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserId } from '../auth/decorators/user-id.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InvitationRdo } from '@fit-friends/libs/rdo';
import { fillObject } from '@fit-friends/libs/utils';

@ApiTags('Invitations')
@ApiBearerAuth()
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @ApiOkResponse({type: InvitationRdo})
  @ApiOperation({ summary: 'Создание заявки на персональную/совместную тренировку' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post(':userId')
  async create(@Param('userId') toUserId: string, @UserId() initiatorId: string): Promise<InvitationRdo> {
    const invitation = await this.invitationsService.create(toUserId, initiatorId);
    return fillObject(InvitationRdo, invitation);
  }

  @ApiOkResponse({type: InvitationRdo})
  @ApiOperation({ summary: 'Изменение статуса заявки' })
  @UseGuards(AuthGuard)
  @Put(':userIdd')
  async changeStatus(@Param('userIdd') invitationId: string, @Body() { status }: ChangeStatusDto, @UserId() userId: string): Promise<InvitationRdo> {
    const invitation = await this.invitationsService.changeStatus(invitationId, status, userId);
    return fillObject(InvitationRdo, invitation);
  }
}
