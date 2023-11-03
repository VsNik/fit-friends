import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '@fit-friends/libs/types';
import { NotifyService } from './notify.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserId } from '../auth/decorators/user-id.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @ApiNoContentResponse()
  @ApiOperation({ summary: 'Запуск рассылки уведомлений' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Get()
  async sendNotifications(@UserId() coachId: string) {
    await this.notifyService.send(coachId);
  }
}
