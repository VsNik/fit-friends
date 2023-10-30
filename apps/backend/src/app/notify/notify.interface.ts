export interface INotify {
  id?: string;
  coachId: string;
  coachName: string;
  subscribeEmails: string[];
  trainingTitle: string;
  trainingImage: string;
  createdAt?: string;
}
