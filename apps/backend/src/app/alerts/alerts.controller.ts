import { plainToInstance } from 'class-transformer';
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Pagination } from '@fit-friends/libs/types';
import { fillObject } from '@fit-friends/libs/utils';
import { AlertCollectionRdo, AlertRdo } from '@fit-friends/libs/rdo';
import { AlertsService } from './alerts.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Alerts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard)
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @ApiOperation({ summary: 'Список оповещений пользователя/тренера' })
  @ApiOkResponse({ type: AlertCollectionRdo })
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

  @ApiOperation({ summary: 'Удалить оповещение' })
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) alertId: string, @UserId() currentUserId: string) {
    return await this.alertsService.delete(alertId, currentUserId);
  }
}
