import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, UsersFilter } from '@fit-friends/filters';
import { IUsersRepository } from './entities/users-repository.interface';
import { User } from './models/user.model';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async all(query: UsersFilter): Promise<[UserEntity[], number]> {
    const { limit, page, type, level, location, sorting, direction } = query;

    const qb = this.repository.createQueryBuilder('user').select('user');

    if (type) {
      const trainingTypes = Array.isArray(type) ? type : [type];
      qb.andWhere('user.trainingType && ARRAY[:...trainingTypes]::users_trainingtype_enum[]', { trainingTypes });
    }

    if (level) {
      const trainingLevel = Array.isArray(level) ? level : [level];
      qb.andWhere('user.trainingLevel IN (:...trainingLevel)', { trainingLevel });
    }

    if (location) {
      const metro = Array.isArray(location) ? location : [location];
      qb.andWhere('user.location IN (:...metro)', { metro });
    }
    
    qb.orderBy(`user.${sorting}`, direction);
    qb.addOrderBy('user.createdAt', 'DESC');
    qb.limit(limit);
    qb.offset(limit * (page - 1));

    const [data, count] = await qb.getManyAndCount();
    return [data.map((item) => UserEntity.create(item)), count];
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    return this.repository.save(entity);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.repository.findOneBy({ email });
    return result ? UserEntity.create(result) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await this.repository.findOneBy({ id });
    return result ? UserEntity.create(result) : null;
  }

  async update(entity: UserEntity): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, following, followers, subscribing, subscribers, ...toUpdate } = entity;
    await this.repository.update({ id }, toUpdate);
  }

  async findByIdAndRelation(id: string): Promise<UserEntity | null> {
    const result = await this.repository.findOne({
      where: { id },
      relations: { followers: true, following: true, subscribing: true, subscribers: true },
    });
    return result ? UserEntity.create(result) : null;
  }

  async findFollowings(userId: string, pagination: Pagination): Promise<[UserEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      where: {
        followers: { id: userId },
      },
      order: { createdAt: pagination.direction },
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
    });
    return [data.map((item) => UserEntity.create(item)), count];
  }

  async findFollowers(userId: string, pagination: Pagination): Promise<[UserEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      where: [
        {following: { id: userId }},
        {followers: { id: userId }},
      ],
      order: { createdAt: pagination.direction },
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
    });
    return [data.map((item) => UserEntity.create(item)), count];
  }
}
