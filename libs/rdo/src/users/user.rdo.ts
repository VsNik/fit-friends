import {Expose} from 'class-transformer';
import {Gender, Role, Location, TrainingLevel, TrainingType} from '@fit-friends/libs/types';

export class UserRdo {
    @Expose()
    id: string;
  
    @Expose()
    name: string;
  
    @Expose()
    email: string;
  
    @Expose()
    avatar?: string;
  
    @Expose()
    gender: Gender;
  
    @Expose()
    birthDay?: string;
  
    @Expose()
    role: Role;
  
    @Expose()
    bio?: string;
  
    @Expose()
    location: Location;
  
    @Expose()
    bgImage: string;
  
    @Expose()
    trainingLevel: TrainingLevel;
  
    @Expose()
    trainingType: TrainingType[];
  
    @Expose()
    createdAt: string;
}