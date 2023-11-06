import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '@fit-friends/libs/types';
import { NotifyService } from './notify.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserId } from '../auth/decorators/user-id.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @ApiOperation({ summary: 'Запуск рассылки уведомлений' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Get()
  async sendNotifications(@UserId() coachId: string) {
    return await this.notifyService.send(coachId);
  }
}
