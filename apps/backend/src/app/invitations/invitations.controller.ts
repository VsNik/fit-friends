import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@fit-friends/shared';
import { InvitationsService } from './invitations.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserId } from '../auth/decorators/user-id.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeStatusDto } from './dto/change-status.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InvitationRdo } from '@fit-friends/libs/rdo';
import { fillObject } from '@fit-friends/libs/utils';

@ApiTags('Invitations')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @ApiOperation({ summary: 'Создание заявки на персональную/совместную тренировку' })
  @ApiCreatedResponse({ type: InvitationRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post(':userId')
  async create(@Param('userId', new ParseUUIDPipe()) toUserId: string, @UserId() initiatorId: string): Promise<InvitationRdo> {
    const invitation = await this.invitationsService.create(toUserId, initiatorId);
    return fillObject(InvitationRdo, invitation);
  }

  @ApiOperation({ summary: 'Изменение статуса заявки' })
  @ApiOkResponse({ type: InvitationRdo })
  @UseGuards(AuthGuard)
  @Patch(':invitationId')
  async changeStatus(
    @Param('invitationId', new ParseUUIDPipe()) invitationId: string,
    @Body() { status }: ChangeStatusDto,
    @UserId() userId: string,
  ): Promise<InvitationRdo> {
    const invitation = await this.invitationsService.changeStatus(invitationId, status, userId);
    return fillObject(InvitationRdo, invitation);
  }

  @ApiOperation({ summary: 'Список заявок пользователя' })
  @ApiOkResponse({ type: [InvitationRdo] })
  @UseGuards(AuthGuard)
  @Get()
  async myInvite(@UserId() currentUserId: string): Promise<InvitationRdo[]> {
    const invitations = await this.invitationsService.getUserInvite(currentUserId);
    return invitations.map((item) => fillObject(InvitationRdo, item));
  }
}
