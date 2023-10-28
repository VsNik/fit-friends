import { Controller, Delete, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('alerts')
export class AlertsController {
    constructor(private readonly alertsService: AlertsService){}

    @UseGuards(AuthGuard)
    @Get()
    get(@UserId() currentUserId: string) {
        return this.alertsService.find(currentUserId);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') alertId: string, @UserId() currentUserId: string) {
        this.alertsService.delete(alertId, currentUserId);
    }
}
