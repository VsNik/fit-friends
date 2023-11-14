import {CoachType, Gender, Location, Role, TrainingLevel, TrainingType} from "@fit-friends/shared";

export const fakeCoach: CoachType = {
  id: 'b23b3414-e6fc-4bbf-9375-81c050ed6e3e',
  name: 'Валерия',
  email: 'valery@app.test',
  avatar: '/assets/img/content/user-photo-1.png',
  gender: Gender.Female,
  birthDay: '1985-12-04',
  role: Role.Coach,
  bio: 'Персональный тренер и инструктор групповых программ с опытом  более 4х лет. Специализация: коррекция фигуры и осанки, снижение веса, восстановление после травм, пилатес.',
  location: Location.Sportivnaya,
  trainingLevel: TrainingLevel.Professional,
  trainingType: [TrainingType.Yoga, TrainingType.Aerobic, TrainingType.Pilates],
  certificate: [
    '/assets/img/content/certificates-and-diplomas/certificate-1.jpg',
    '/assets/img/content/certificates-and-diplomas/certificate-2.jpg',
    '/assets/img/content/certificates-and-diplomas/certificate-3.jpg',
    '/assets/img/content/certificates-and-diplomas/certificate-4.jpg',
    '/assets/img/content/certificates-and-diplomas/certificate-5.jpg',
    '/assets/img/content/certificates-and-diplomas/certificate-6.jpg',
  ],
  personalTraining: true,
  createdAt: '2019-10-10T17:37:56.678Z'
}
