import { Gender, Role, TrainingDuration, TrainingLevel, TrainingType, Location, IUser } from '@fit-friends/libs/types';
import { randomUUID } from 'crypto';

export class UserEntity implements IUser {
  id: string = randomUUID();
  name: string;
  email: string;
  avatar?: string;
  password: string;
  gender: Gender;
  birthDay?: string;
  role: Role;
  bio?: string;
  location: Location;
  bgImage: string;
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  trainingDuration?: TrainingDuration;
  loseCalories?: number;
  burnCalories?: number;
  ready?: boolean;
  certificate?: string;
  merits?: string;
  personalTraining?: boolean;
  followers?: IUser[];
  following?: IUser[];
  subscribing?: IUser[];
  subscribers?: IUser[];
  createdAt: string = new Date().toISOString();

  public static create(iten: Partial<IUser>): UserEntity {
    const user = new UserEntity();
    Object.assign(user, iten);
    return user;
  }

  public setAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public setCertificate(certificate: string): void {
    this.certificate = certificate;
  }

  public updateRoleUser(item: Partial<IUser>) {
    this.update(item);
    this.trainingDuration = item.trainingDuration ?? this.trainingDuration;
    this.loseCalories = item.loseCalories ?? this.loseCalories;
    this.burnCalories = item.burnCalories ?? this.burnCalories;
    this.ready = item.ready ?? this.ready;
  }

  public updateRoleCoach(item: Partial<IUser>) {
    this.update(item);
    this.merits = item.merits ?? this.merits;
    this.personalTraining = item.personalTraining ?? this.personalTraining;
  }

  public update(item: Partial<IUser>) {
    this.name = item.name ?? this.name;
    this.gender = item.gender ?? this.gender;
    this.birthDay = item.birthDay ?? this.birthDay;
    this.bio = item.bio ?? this.bio;
    this.location = item.location ?? this.location;
    this.bgImage = item.bgImage ?? this.bgImage;
    this.trainingLevel = item.trainingLevel ?? this.trainingLevel;
    this.trainingType = item.trainingType ?? this.trainingType;
  }

  public toObject(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar ?? '',
      gender: this.gender,
      birthDay: this.birthDay ?? '',
      role: this.role,
      bio: this.bio ?? '',
      location: this.location,
      bgImage: this.bgImage,
      trainingLevel: this.trainingLevel,
      trainingType: this.trainingType,
      trainingDuration: this.trainingDuration,
      loseCalories: this.loseCalories,
      burnCalories: this.burnCalories,
      ready: this.ready,
      certificate: this.certificate ?? '',
      merits: this.merits ?? '',
      personalTraining: this.personalTraining,
      createdAt: this.createdAt,
    };
  }
}
