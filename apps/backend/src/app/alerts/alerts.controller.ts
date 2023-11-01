import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { Pagination } from '@fit-friends/libs/types';
import { plainToInstance } from 'class-transformer';
import { AlertsService } from './alerts.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  // Список оповещений
  @UseGuards(AuthGuard)
  @Get()
  async listByUser(@UserId() currentUserId: string, @Query() query: Pagination) {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.alertsService.getByUserId(currentUserId, pagination);
    return {
      data,
      page: pagination.page,
      total,
    };
  }

  // Удалить оповещение
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') alertId: string, @UserId() currentUserId: string) {
    this.alertsService.delete(alertId, currentUserId);
  }
}
