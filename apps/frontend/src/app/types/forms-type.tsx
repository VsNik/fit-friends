import { InferType } from 'yup';
import {
  addCertificateSchema,
  loginSchema,
  questionCoachSchema,
  questionUserSchema,
  reviewSchema,
  signupSchema,
  trainingSchema,
  updateCertificateSchema,
  updateTrainingSchema,
  userInfoSchema,
  videoSchema,
} from '../utils/validate-schemas';

export type LoginType = InferType<typeof loginSchema>;
export type SignupType = InferType<typeof signupSchema>;
export type QuestionUserType = InferType<typeof questionUserSchema>;
export type QuestionCoachType = InferType<typeof questionCoachSchema>;
export type UserInfoType = InferType<typeof userInfoSchema>;
export type AddTrainingType = InferType<typeof trainingSchema>;
export type UpdateTrainingType = InferType<typeof updateTrainingSchema>;
export type VideoType = InferType<typeof videoSchema>;
export type AddCertificateType = InferType<typeof addCertificateSchema>;
export type UpdateCertificateType = InferType<typeof updateCertificateSchema>;
export type CreateReviewType = InferType<typeof reviewSchema>;
