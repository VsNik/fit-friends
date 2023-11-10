import { Body, Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@fit-friends/shared';
import { RoleGuard } from '../auth/guards/role.guard';
import { UserId } from '../auth/decorators/user-id.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { fillObject } from '@fit-friends/libs/utils';
import { OrderRdo } from '@fit-friends/libs/rdo';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiCreatedResponse({ type: OrderRdo })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post(':trainingId')
  async create(
    @Param('trainingId', new ParseUUIDPipe()) trainingId: string,
    @UserId() userId: string,
    @Body() dto: CreateOrderDto,
  ): Promise<OrderRdo> {
    const order = await this.ordersService.create(dto, trainingId, userId);
    return fillObject(OrderRdo, order);
  }
}
