import { UserEntity } from './user.entity';

export interface IUsersRepository {
  create(entity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

export const USERS_REPO = Symbol('USERS_REPO');
