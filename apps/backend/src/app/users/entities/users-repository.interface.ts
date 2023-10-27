import { Pagination, UsersFilter } from '@fit-friends/libs/types';
import { UserEntity } from './user.entity';

export interface IUsersRepository {
  all(query: UsersFilter): Promise<[UserEntity[], number]>;
  save(entity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  update(entity: UserEntity): Promise<void>;
  findByIdAndRelation(id: string): Promise<UserEntity | null>;
  findFollowings(userId: string, pagination: Pagination): Promise<[UserEntity[], number]>;
  findFollowers(userId: string, pagination: Pagination): Promise<[UserEntity[], number]>;
}

export const USERS_REPO = Symbol('USERS_REPO');
