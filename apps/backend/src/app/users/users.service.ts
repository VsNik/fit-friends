import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUsersRepository, USERS_REPO } from './entities/users-repository.interface';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CreateCoachDto } from '../auth/dto/create-coach.dto';
import { IUser } from './user.interface';
import { UserEntity } from './entities/user.entity';

const USER_EXIST_ERROR = 'User with Email address is already exist.';
const PSWD_SALT = 12;

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto | CreateCoachDto): Promise<IUser> {
    const existUser = await this.findByEmail(dto.email);
    if (existUser) {
      throw new UnprocessableEntityException(USER_EXIST_ERROR);
    }
    const hashPswd = await hash(dto.password, PSWD_SALT);
    const userEntity = UserEntity.create({ ...dto, password: hashPswd });
    const savedUser = await this.usersRepository.create(userEntity);
    return savedUser.toObject();
  }

  async findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findByEmail(email);
  }
}
