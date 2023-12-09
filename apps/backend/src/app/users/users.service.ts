import { hash } from 'bcrypt';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ExpressFile } from '@fit-friends/libs/types';
import { CoachType, IUser, Role, UploadType, UserType } from '@fit-friends/shared';
import { Pagination, UsersFilter } from '@fit-friends/filters';
import { AppEvent, PASSWORD_SALT } from '@fit-friends/libs/constants';
import { getRandomBg } from '@fit-friends/libs/utils';
import { IUsersRepository, USERS_REPO } from './entities/users-repository.interface';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CreateCoachDto } from '../auth/dto/create-coach.dto';
import { UserEntity } from './entities/user.entity';
import { FilesService } from '../files/files.service';
import { UserAddedToFriendsEvent } from './events/user-added-to-friends.event';
import { UpdateDto } from './dto/update.dto';
import { OtherError, AppError, EMAIL_EXIST } from '@fit-friends/libs/validation';
import { SignupDto } from '../auth/dto/signup.dto';

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

  async create(dto: SignupDto, fileAvatar: ExpressFile): Promise<IUser> {
    const existUser = await this.findByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(EMAIL_EXIST);
    }

    const avatar = await this.fileService.upload(fileAvatar, UploadType.Avatar);
    const bgImage = Array(2)
      .fill(null)
      .map(() => getRandomBg(UploadType.BgUser));

    const passwordHash = await hash(dto.password, PASSWORD_SALT);
    const userEntity = UserEntity.create({ ...dto, password: passwordHash, avatar, bgImage });
    const savedUser = await this.usersRepository.save(userEntity);

    return savedUser.toObject();
  }

  async createUserProfile(userId: string, dto: CreateUserDto): Promise<UserType> {
    const existUser = await this.getUser(userId);
    existUser.updateRoleUser(dto);
    await this.usersRepository.update(existUser);
    return existUser.toObject();
  }

  async createCoachProfile(userId: string, dto: CreateCoachDto, fileCertificate: ExpressFile): Promise<CoachType> {
    const existUser = await this.getUser(userId);
    const certificate = await this.fileService.upload(fileCertificate, UploadType.Certificate);

    existUser.updateRoleCoach({ ...dto, certificate: [certificate] });
    existUser.setCertificate(certificate);
    await this.usersRepository.update(existUser);
    return existUser.toObject();
  }

  async update(userId: string, dto: UpdateDto, fileAvatar: ExpressFile, fileCertificate: ExpressFile): Promise<IUser> {
    const existUser = await this.getUser(userId);

    if (fileAvatar) {
      if (existUser.avatar) {
        await this.fileService.delete(existUser.avatar);
      }

      existUser.setAvatar(await this.fileService.upload(fileAvatar, UploadType.Avatar));
    }

    if (existUser.role === Role.User) {
      existUser.updateRoleUser(dto);
    } else {
      if (fileCertificate) {
        existUser.setCertificate(await this.fileService.upload(fileCertificate, UploadType.Certificate));
      }

      existUser.updateRoleCoach(dto);
    }

    await this.usersRepository.update(existUser);
    return existUser.toObject();
  }

  async addCertificate(userId: string, certificateFile: ExpressFile): Promise<IUser> {
    const existUser = await this.getUser(userId);
    const certificate = await this.fileService.upload(certificateFile, UploadType.Certificate);
    existUser.setCertificate(certificate);
    await this.usersRepository.update(existUser);
    return existUser.toObject();
  }

  async updateCertificate(userId: string, src: string, certificate: ExpressFile): Promise<IUser> {
    const existUser = await this.getUser(userId);
    const certificates = existUser.certificate;
    if (certificates.includes(src)) {
      const updatedCertificates = certificates.filter((item) => item !== src);
      existUser.certificate = updatedCertificates;
      await this.fileService.delete(src);
      const addedCertificate = await this.fileService.upload(certificate, UploadType.Certificate);
      existUser.setCertificate(addedCertificate);
      await this.usersRepository.update(existUser);
    }
    return existUser.toObject();
  }

  async deleteSertificate(userId: string, src: string) {
    const existUser = await this.getUser(userId);
    const certificates = existUser.certificate;
    const updatedCertificates = certificates.filter((item) => item !== src);
    existUser.certificate = updatedCertificates;
    await this.fileService.delete(src);
    await this.usersRepository.update(existUser);
    return existUser.toObject();
  }

  async followUnfollow(followId: string, currentUserId: string): Promise<boolean> {
    if (followId === currentUserId) {
      throw new BadRequestException(OtherError.FollowEqual);
    }

    const followUser = await this.findById(followId);
    if (!followUser) {
      throw new BadRequestException(AppError.UserNotFound);
    }

    const currentUser = await this.usersRepository.findByIdAndRelation(currentUserId);
    const indexFollower = currentUser.followers.findIndex((item) => item.id === followId);
    const indexFollowing = currentUser.following.findIndex((item) => item.id === followId);

    if (indexFollower < 0 && indexFollowing < 0) {
      currentUser.followers.push(followUser);
      await this.usersRepository.save(currentUser);

      this.eventEmitter.emit(
        AppEvent.AddedToFriends, 
        new UserAddedToFriendsEvent(followId, currentUser.id, currentUser.name)
      );

      return true;
    }

    if (indexFollower >= 0) {
      currentUser.followers.splice(indexFollower, 1);
      await this.usersRepository.save(currentUser);
      return true;
    }

    if (indexFollowing >= 0) {
      currentUser.following.splice(indexFollower, 1);
      await this.usersRepository.save(currentUser);
      return true;
    }
  }

  async unfollowForCoach(followId: string, currentUserId: string) {
    if (followId === currentUserId) {
      throw new BadRequestException(OtherError.FollowEqual);
    }

    const followUser = await this.usersRepository.findByIdAndRelation(followId);
    if (!followUser) {
      throw new BadRequestException(AppError.UserNotFound);
    }

    const index = followUser.followers.findIndex((item) => item.id === currentUserId);

    if (index >= 0) {
      followUser.followers.splice(index, 1);
      await this.usersRepository.save(followUser);
      return true;
    }
    return false;
  }

  async getFollowing(currentUserId: string, pagination: Pagination) {
    const following = await this.usersRepository.findFollowings(currentUserId, pagination);
    return following;
  }

  async getFollowers(currentUserId: string, pagination: Pagination) {
    return this.usersRepository.findFollowers(currentUserId, pagination);
  }

  async subscribeUnsubscribe(coachId: string, currentUserId: string) {
    const coachUser = await this.findById(coachId);
    if (!coachUser) {
      throw new NotFoundException(AppError.CoachNotFound);
    }

    if (coachUser.role !== Role.Coach) {
      throw new BadRequestException(OtherError.SubscribeRole);
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
      throw new NotFoundException(AppError.UserNotFound);
    }

    return existUser;
  }

  async getDetails(id: string, currentUserId: string): Promise<IUser> {
    const existUser = await this.getUser(id);
    const currentUser = await this.usersRepository.findByIdAndRelation(currentUserId);

    let isFollow = false;
    let isSubscribe = false;

    if (currentUser.role === Role.User) {
      const followerIds = currentUser.followers?.map((item) => item.id);
      const followingIds = currentUser.following?.map((item) => item.id);
      isFollow = (followerIds?.includes(id) || followingIds?.includes(id)) ?? false;
      const subscribeIds = currentUser.subscribing?.map((item) => item.id);
      isSubscribe = subscribeIds?.includes(id);

      return { ...existUser, isFollow, isSubscribe };
    } else {
      const followingIds = currentUser.following?.map((item) => item.id);
      isFollow = followingIds?.includes(id) ?? false;
      
      return { ...existUser, isFollow };
    }
  }

  async getCompany(): Promise<[IUser[], number]> {
    const [data, count] = await this.usersRepository.forCompany();
    return [data.map((item) => item.toObject()), count];
  }
}
