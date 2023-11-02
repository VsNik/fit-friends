import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { BalanceDto } from './dto/balance.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { IBalance, Pagination, Role } from '@fit-friends/libs/types';
import { RoleGuard } from '../auth/guards/role.guard';
import { plainToInstance } from 'class-transformer';
import { fillObject } from '@fit-friends/libs/utils';
import { BalanceCollectionRdo, BalanceRdo, TrainingRdo } from '@fit-friends/libs/rdo';

@Roles(Role.User)
@UseGuards(RoleGuard)
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  // общий баланса: количество доступных тренировок.
  @Get()
  async all(@UserId() currentUserId: string, @Query() query: Pagination) {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.balanceService.getManyByUserId(currentUserId, pagination);
    return fillObject(BalanceCollectionRdo, {
      data: data.map((balance) => this.mapBalance(balance)),
      page: pagination.page,
      total,
    })
  }

  // количество доступных тренировок данного типа
  @Get(':trainingId')
  async show(@UserId() currentUserId: string, @Param('trainingId') trainingId: string): Promise<BalanceRdo> {
    const balance = await this.balanceService.getByTriningId(trainingId, currentUserId);
    return this.mapBalance(balance);
  }

  // списание тренировок
  @Put(':trainingId/admission')
  async admission(@UserId() currentUserId: string, @Param('trainingId') trainingId: string, @Body() { count }: BalanceDto): Promise<BalanceRdo> {
    const balance = await this.balanceService.admission(currentUserId, trainingId, count);
    return this.mapBalance(balance);
  }

  // списание тренировок
  @Put(':trainingId/dismission')
  async dismission(@UserId() currentUserId: string, @Param('trainingId') trainingId: string, @Body() { count }: BalanceDto): Promise<BalanceRdo> {
    const balance = await this.balanceService.dismission(currentUserId, trainingId, count);
    return this.mapBalance(balance);
  }

  private mapBalance(balance: IBalance) {
    return fillObject(BalanceRdo, {
      ...balance, 
      training: fillObject(TrainingRdo, balance.training)
    })
  }
}
