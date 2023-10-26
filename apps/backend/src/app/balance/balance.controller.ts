import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { BalanceDto } from './dto/balance.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@fit-friends/libs/types';
import { RoleGuard } from '../auth/guards/role.guard';

@Roles(Role.User)
@UseGuards(RoleGuard)
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async all(@UserId() currentUserId: string) {
    const [data, total] = await this.balanceService.getAllByUserId(currentUserId);
    return {data, total };
  }

  @Get(':trainingId')
  async show(@UserId() currentUserId: string, @Param('trainingId') trainingId: string) {
    return this.balanceService.getByTriningId(trainingId, currentUserId);
  }

  @Put(':trainingId')
  async dismission(@UserId() currentUserId: string, @Param('trainingId') trainingId: string, @Body() {count}: BalanceDto) {
    return this.balanceService.dismission(currentUserId, trainingId, count);
  }
}
