import { Gender, TrainingDuration, TrainingLevel, TrainingType } from "@fit-friends/libs/types";

export class UpdateTrainingDto {
    readonly title: string;
    readonly level: TrainingLevel;
    readonly type: TrainingType;
    readonly duration: TrainingDuration;
    readonly price: number;
    readonly calories: number;
    readonly description: string;
    readonly gender: Gender;
    readonly video: string;
    readonly isSpecial: boolean;
  }