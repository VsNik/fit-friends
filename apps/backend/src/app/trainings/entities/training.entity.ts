import { Gender, TrainingDuration, TrainingLevel, TrainingType } from "@fit-friends/libs/types";
import { ITraining } from "../training.interface";
import { IUser } from "../../users/user.interface";

export class TrainingEntity implements ITraining {
    id: string;
    name: string;
    bgImage: string;
    level: TrainingLevel;
    type: TrainingType;
    duration: TrainingDuration;
    price: number;
    calories: number;
    description: string;
    gender: Gender;
    video: string;
    rating: number;
    coach: IUser;
    isSpecial: boolean;
    createdAt: string;

    public static create(item: ITraining): TrainingEntity {
        const training = new TrainingEntity();
        training.name = item.name;
        training.bgImage = item.bgImage;
        training.level = item.level;
        training.type = item.type;
        training.duration = item.duration;
        training.price = item.price;
        training.calories = item.calories;
        training.description = item.description;
        training.gender = item.gender;
        training.video = item.video;
        training.coach = item.coach;
        training.isSpecial = item.isSpecial;
        return training;
    }
}