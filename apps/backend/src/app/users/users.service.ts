import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUsersRepository, USERS_REPO } from './entities/users-repository.interface';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CreateCoachDto } from '../auth/dto/create-coach.dto';
import { IUser } from './user.interface';
import { UserEntity } from './entities/user.entity';
import { ExpressFile, UploadType, UsersFilter } from '@fit-friends/libs/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { FilesService } from '../files/files.service';

const USER_EXIST_ERROR = 'User with Email address is already exist.';
const USER_NOT_FOUND_ERROR = 'User not found';
const PASSWORD_SALT = 12;

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepository: IUsersRepository,
    private readonly fileService: FilesService,
  ) {}

  async all(query: UsersFilter): Promise<[IUser[], number]> {
    const [data, count] = await this.usersRepository.all(query);
    return [data.map((item) => item.toObject()), count];
  }

  async create(dto: CreateUserDto | CreateCoachDto, fileAvatar: ExpressFile, fileBgImage: ExpressFile): Promise<IUser> {
    const existUser = await this.findByEmail(dto.email);
    if (existUser) {
      throw new UnprocessableEntityException(USER_EXIST_ERROR);
    }

    const avatar = await this.fileService.upload(fileAvatar, UploadType.Avatar);
    const bgImage = await this.fileService.upload(fileBgImage, UploadType.BgImage);

    const passwordHash = await hash(dto.password, PASSWORD_SALT);
    const userEntity = UserEntity.create({ ...dto, password: passwordHash, avatar, bgImage });
    const savedUser = await this.usersRepository.create(userEntity);

    return savedUser.toObject();
  }

  async findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findByEmail(email);
  }

  async getUser(id: string): Promise<UserEntity> {
    const existUser = await this.findById(id);
    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return existUser;
  }

  async update(userId: string, dto: UpdateUserDto | UpdateCoachDto, fileAvatar: ExpressFile, fileBgImage: ExpressFile): Promise<IUser> {
    const existUser = await this.getUser(userId);

    const avatar = fileAvatar 
      ? await this.fileService.upload(fileAvatar, UploadType.Avatar) 
      : existUser.avatar;
      
    const bgImage = fileBgImage 
      ? await this.fileService.upload(fileBgImage, UploadType.BgImage) 
      : existUser.bgImage;

    existUser.update({...dto, avatar, bgImage});
    
    return existUser.toObject();
  }
}
