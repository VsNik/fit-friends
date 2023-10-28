import { hash } from 'bcrypt';
import { BadRequestException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ExpressFile, Pagination, Role, UploadType, UsersFilter } from '@fit-friends/libs/types';
import { IUsersRepository, USERS_REPO } from './entities/users-repository.interface';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CreateCoachDto } from '../auth/dto/create-coach.dto';
import { IUser } from './user.interface';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { FilesService } from '../files/files.service';
import { UserAddedToFriendsEvent } from './events/user-added-to-friends.event';

const USER_EXIST_ERROR = 'User with Email address is already exist.';
const FOLLOW_EQUAL_ERROR = 'Follover and folloving can be not equal.';
const FOLLOW_USER_NOT_FOUND_ERROR = 'Follow user not found.';
const USER_NOT_FOUND_ERROR = 'User not found.';
const COACH_NOT_FOUND_ERROR = 'Coach not found.';
const SUBSCRIBE_ROLE_ERROR = "You can't subscribe to a regular user.";
const PASSWORD_SALT = 12;

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPO)
    private readonly usersRepository: IUsersRepository,
    private readonly fileService: FilesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async all(query: UsersFilter): Promise<[IUser[], number]> {
    const [data, count] = await this.usersRepository.all(query);
    return [data.map((item) => item.toObject()), count];
  }

  async create(dto: CreateUserDto | CreateCoachDto, fileAvatar: ExpressFile, fileCertificate?: ExpressFile): Promise<IUser> {
    const existUser = await this.findByEmail(dto.email);
    if (existUser) {
      throw new UnprocessableEntityException(USER_EXIST_ERROR);
    }

    const avatar = await this.fileService.upload(fileAvatar, UploadType.Avatar);
    const certificate = (await this.fileService.upload(fileCertificate, UploadType.Certificate)) ?? '';
    const bgImage = avatar;

    const passwordHash = await hash(dto.password, PASSWORD_SALT);
    const userEntity = UserEntity.create({ ...dto, password: passwordHash, avatar, bgImage, certificate });
    const savedUser = await this.usersRepository.save(userEntity);

    return savedUser.toObject();
  }

  async update(userId: string, dto: UpdateUserDto | UpdateCoachDto, fileAvatar: ExpressFile, fileCertificate?: ExpressFile): Promise<IUser> {
    const existUser = await this.getUser(userId);
    Object.assign(existUser, dto);

    if (fileAvatar) {
      if (existUser.avatar) {
        await this.fileService.delete(existUser.avatar);
      }
      const avatar = await this.fileService.upload(fileAvatar, UploadType.Avatar);
      existUser.avatar = avatar;
      existUser.bgImage = avatar;
    }

    if (fileCertificate) {
      if (existUser.certificate) {
        await this.fileService.delete(existUser.certificate);
      }
      existUser.certificate = await this.fileService.upload(fileCertificate, UploadType.Certificate);
    }

    await this.usersRepository.update(existUser);
    return existUser.toObject();
  }

  async followUnfollow(followId: string, currentUserId: string): Promise<boolean> {
    if (followId === currentUserId) {
      throw new BadRequestException(FOLLOW_EQUAL_ERROR);
    }

    const followUser = await this.findById(followId);
    if (!followUser) {
      throw new BadRequestException(FOLLOW_USER_NOT_FOUND_ERROR);
    }

    const currentUser = await this.usersRepository.findByIdAndRelation(currentUserId);
    const index = currentUser.followers.findIndex((item) => item.id === followId);

    if (index < 0) {
      currentUser.followers.push(followUser);
      await this.usersRepository.save(currentUser);

      this.eventEmitter.emit(
        'added-to-friends.event', 
        new UserAddedToFriendsEvent(followId, currentUser.id, currentUser.name)
      );

      return true;
    }

    currentUser.followers.splice(index, 1);
    await this.usersRepository.save(currentUser);
    return true;
  }

  async getFollowing(userId: string, pagination: Pagination) {
    return this.usersRepository.findFollowings(userId, pagination);
  }

  async getFollowers(userId: string, pagination: Pagination) {
    return this.usersRepository.findFollowers(userId, pagination);
  }

  async subscribeUnsubscribe(coachId: string, currentUserId: string) {
    const coachUser = await this.findById(coachId);
    if (!coachUser) {
      throw new NotFoundException(COACH_NOT_FOUND_ERROR);
    }

    if (coachUser.role !== Role.Coach) {
      throw new BadRequestException(SUBSCRIBE_ROLE_ERROR);
    }

    const currentUser = await this.usersRepository.findByIdAndRelation(currentUserId);
    const index = currentUser.subscribing.findIndex((item) => item.id === coachId);

    if (index < 0) {
      currentUser.subscribing.push(coachUser);
      await this.usersRepository.save(currentUser);
      return true;
    }

    currentUser.subscribing.splice(index, 1);
    await this.usersRepository.save(currentUser);
    return true;
  }

  async findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findByIdAndRelation(id);
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
}
