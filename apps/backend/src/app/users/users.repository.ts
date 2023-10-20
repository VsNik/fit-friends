import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './entities/users-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    return this.repository.save(entity);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.repository.findOneBy({ email });
    return result ? UserEntity.create(result) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await this.repository.findOneBy({id});
    return result ? UserEntity.create(result) : null;
  }
}
