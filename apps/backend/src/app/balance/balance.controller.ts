import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { UserId } from '../auth/decorators/user-id.decorator';
import { BalanceDto } from './dto/balance.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { IBalance, Role, SortDirection } from '@fit-friends/shared';
import { Pagination } from '@fit-friends/filters';
import { RoleGuard } from '../auth/guards/role.guard';
import { plainToInstance } from 'class-transformer';
import { fillObject, getLimit } from '@fit-friends/libs/utils';
import { BalanceCollectionRdo, BalanceRdo, TrainingRdo } from '@fit-friends/libs/rdo';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Balance')
@Roles(Role.User)
@UseGuards(RoleGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden.' })
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({ summary: 'Общий баланс' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'direction', required: false, enum: SortDirection })
  @ApiOkResponse({ type: BalanceCollectionRdo })
  @Get()
  async all(@UserId() currentUserId: string, @Query() query: Pagination): Promise<BalanceCollectionRdo> {
    const limit = getLimit(query.limit);
    const pagination = plainToInstance(Pagination, { ...query, limit });
    const [data, total] = await this.balanceService.getManyByUserId(currentUserId, pagination);
    return fillObject(BalanceCollectionRdo, {
      data: data.map((balance) => this.mapBalance(balance)),
      page: pagination.page,
      total,
    });
  }

  @ApiOperation({ summary: 'Количество доступных тренировок данного типа' })
  @ApiOkResponse({ type: BalanceRdo })
  @Get(':trainingId')
  async show(@UserId() currentUserId: string, @Param('trainingId', new ParseUUIDPipe()) trainingId: string): Promise<BalanceRdo> {
    const balance = await this.balanceService.getByTriningId(trainingId, currentUserId);
    return balance ? this.mapBalance(balance) : null;
  }

  @ApiOperation({ summary: 'Сделать активной' })
  @ApiOkResponse({ type: BalanceRdo })
  @Patch(':trainingId/active')
  async setActive(@UserId() currentUserId: string, @Param('trainingId', new ParseUUIDPipe()) trainingId: string) {
    const balance = await this.balanceService.setActive(currentUserId, trainingId);
    return this.mapBalance(balance);
  }

  @ApiOperation({ summary: 'Сделать не активной' })
  @ApiOkResponse({ type: BalanceRdo })
  @Patch(':trainingId/no-active')
  async setNoActive(@UserId() currentUserId: string, @Param('trainingId', new ParseUUIDPipe()) trainingId: string) {
    const balance = await this.balanceService.setNoActive(currentUserId, trainingId);
    return this.mapBalance(balance);
  }

  @ApiOperation({ summary: 'Пополнение баланса тренировок' })
  @ApiOkResponse({ type: BalanceRdo })
  @Patch(':trainingId/admission')
  async admission(
    @UserId() currentUserId: string,
    @Param('trainingId', new ParseUUIDPipe()) trainingId: string,
    @Body() { count }: BalanceDto,
  ): Promise<BalanceRdo> {
    const balance = await this.balanceService.admission(currentUserId, trainingId, count);
    return this.mapBalance(balance);
  }

  @ApiOperation({ summary: 'Списание баланса тренировок' })
  @ApiOkResponse({ type: BalanceRdo })
  @Patch(':trainingId/dismission')
  async dismission(
    @UserId() currentUserId: string,
    @Param('trainingId', new ParseUUIDPipe()) trainingId: string,
    @Body() { count }: BalanceDto,
  ): Promise<BalanceRdo> {
    const balance = await this.balanceService.dismission(currentUserId, trainingId, count);
    return this.mapBalance(balance);
  }

  private mapBalance(balance: IBalance) {
    return fillObject(BalanceRdo, {
      ...balance,
      training: fillObject(TrainingRdo, balance.training),
    });
  }
}
