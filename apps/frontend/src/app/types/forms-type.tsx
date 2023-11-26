import { InferType } from "yup";
import { loginSchema, questionCoachSchema, questionUserSchema, signupSchema, trainingSchema, userInfoSchema } from "../utils/validate-schemas";

export type LoginType = InferType<typeof loginSchema>;
export type SignupType = InferType<typeof signupSchema>;
export type QuestionUserType = InferType<typeof questionUserSchema>;
export type QuestionCoachType = InferType<typeof questionCoachSchema>;
export type UserInfoType = InferType<typeof userInfoSchema>;
export type AddTrainingType = InferType<typeof trainingSchema>;
