import { UsersFilter } from '@fit-friends/libs/types';
import { UserEntity } from './user.entity';

export interface IUsersRepository {
  all(query: UsersFilter): Promise<[UserEntity[], number]>;
  create(entity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  update(entity: UserEntity): Promise<void>;
}

export const USERS_REPO = Symbol('USERS_REPO');
