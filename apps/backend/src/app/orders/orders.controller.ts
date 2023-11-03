import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@fit-friends/libs/types';
import { RoleGuard } from '../auth/guards/role.guard';
import { UserId } from '../auth/decorators/user-id.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { fillObject } from '@fit-friends/libs/utils';
import { OrderRdo } from '@fit-friends/libs/rdo';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({type: OrderRdo})
  @ApiOperation({ summary: 'Создание заказа' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post(':trainingId')
  async create(@Param('trainingId') trainingId: string, @UserId() userId: string, @Body() dto: CreateOrderDto): Promise<OrderRdo> {
    const order = await this.ordersService.create(dto, trainingId, userId);
    return fillObject(OrderRdo, order);
  }
}
