import { Pagination, UsersFilter } from '@fit-friends/filters';
import { UserEntity } from './user.entity';

export const USERS_REPO = Symbol('USERS_REPO');

export interface IUsersRepository {
  all(query: UsersFilter): Promise<[UserEntity[], number]>;
  save(entity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  update(entity: UserEntity): Promise<void>;
  findByIdAndRelation(id: string): Promise<UserEntity | null>;
  findFollowings(userId: string, pagination: Pagination): Promise<[UserEntity[], number]>;
  findFollowers(userId: string, pagination: Pagination): Promise<[UserEntity[], number]>;
  forCompany(): Promise<[UserEntity[], number]>;
}
