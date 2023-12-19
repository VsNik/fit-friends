import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BALANCE_REPO } from './entities/balance-repository.interface';
import { BalanceRepository } from './balance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './models/balance.model';
import { BalanceController } from './balance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  providers: [
    BalanceService,
    {
      provide: BALANCE_REPO,
      useClass: BalanceRepository,
    },
  ],
  exports: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule {}
