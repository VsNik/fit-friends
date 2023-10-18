import { Gender, Role, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { CoachType, IUser, UserType } from '../user.interface';

export class UserEntity implements IUser {
  id: string;
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
  createdAt: Date;
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  trainingDuration?: TrainingDuration;
  loseCalories?: number;
  burnCalories?: number;
  ready?: boolean;
  certificate?: string;
  merits?: string;
  personalTraining?: boolean;

  public static CreateUser(item: UserType): UserEntity {
    const user = new UserEntity();
    user.name = item.name;
    user.email = item.email;
    user.avatar = item.avatar;
    user.password = item.password;
    user.gender = item.gender;
    user.birthDay = item.birthDay;
    user.role = item.role;
    user.bio = item.bio;
    user.location = item.location;
    user.bgImage = item.bgImage;
    user.trainingLevel = item.trainingLevel;
    user.trainingType = item.trainingType;
    user.trainingDuration = item.trainingDuration;
    user.loseCalories = item.loseCalories;
    user.burnCalories = item.burnCalories;
    user.ready = item.ready;
    return user;
  }

  public static createCoach(item: CoachType): UserEntity {
    const coach = new UserEntity();
    coach.name = item.name;
    coach.email = item.email;
    coach.avatar = item.avatar;
    coach.password = item.password;
    coach.gender = item.gender;
    coach.birthDay = item.birthDay;
    coach.role = item.role;
    coach.bio = item.bio;
    coach.location = item.location;
    coach.bgImage = item.bgImage;
    coach.trainingLevel = item.trainingLevel;
    coach.trainingType = item.trainingType;
    coach.certificate = item.certificate;
    coach.merits = item.merits;
    coach.personalTraining = item.personalTraining;
    return coach;
  }
}
