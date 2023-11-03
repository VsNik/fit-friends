import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { Pagination } from '@fit-friends/libs/types';
import { plainToInstance } from 'class-transformer';
import { AlertsService } from './alerts.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { fillObject } from '@fit-friends/libs/utils';
import { AlertCollectionRdo, AlertRdo } from '@fit-friends/libs/rdo';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @ApiOkResponse({ type: AlertCollectionRdo })
  @ApiOperation({ summary: 'Список оповещений пользователя/тренера' })
  @Get()
  async listByUser(@UserId() currentUserId: string, @Query() query: Pagination): Promise<AlertCollectionRdo> {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.alertsService.getByUserId(currentUserId, pagination);
    return fillObject(AlertCollectionRdo, {
      data: data.map((alert) => fillObject(AlertRdo, alert)),
      page: pagination.page,
      total,
    });
  }

  @ApiNoContentResponse()
  @ApiOperation({ summary: 'Удалить оповещение' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') alertId: string, @UserId() currentUserId: string) {
    this.alertsService.delete(alertId, currentUserId);
  }
}
