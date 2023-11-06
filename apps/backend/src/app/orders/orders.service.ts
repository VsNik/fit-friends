import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrdersRepository, ORDERS_REPO } from './entities/orders-repository.interface';
import { UsersService } from '../users/users.service';
import { TrainingsService } from '../trainings/trainings.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { BalanceService } from '../balance/balance.service';
import { TRAINING_NOT_FOUND_ERROR } from '@fit-friends/libs/validation';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_REPO)
    private readonly ordersRepository: IOrdersRepository,
    private readonly usersService: UsersService,
    private readonly trainingsService: TrainingsService,
    private readonly balanceService: BalanceService,
  ) {}

  async create(dto: CreateOrderDto, trainingId: string, userId: string) {
    const user = await this.usersService.getUser(userId);
    const training = await this.trainingsService.findById(trainingId);
    if (!training) {
      throw new NotFoundException(TRAINING_NOT_FOUND_ERROR);
    }

    const price = training.price;
    const totalPrice = price * dto.count;
    training.addStatistic(dto.count);

    const orderEntity = OrderEntity.create({ ...dto, price, totalPrice, user, training });
    const savedOrder = await this.ordersRepository.save(orderEntity);

    await this.balanceService.add(userId, training, dto.count);

    await this.trainingsService.updateTraining(training);
    return savedOrder.toObject();
  }
}
