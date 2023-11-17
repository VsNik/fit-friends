import { IReview } from '@fit-friends/shared';
import { fakeCoach } from './fake-user';
import { getFakeTrainings } from './fake-training';

const training = getFakeTrainings(1);

export const fakeReviews: IReview[] = [
  {
    id: '1',
    user: fakeCoach,
    training: training.data[0],
    rating: 5,
    text: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.',
    createdAt: '2012-01-01T00:00:00.000',
  },
  {
    id: '2',
    user: fakeCoach,
    training: training.data[0],
    rating: 5,
    text: 'Спасибо, классная тренировка! Понятная и интересная, с&nbsp;акцентом на&nbsp;правильную технику, как я люблю.',
    createdAt: '2012-01-01T00:00:00.000',
  },
  {
    id: '3',
    user: fakeCoach,
    training: training.data[0],
    rating: 5,
    text: 'Хорошая тренировка, но все&nbsp;же не хватило немного динамики. Для меня оказалась слишком легкой.',
    createdAt: '2012-01-01T00:00:00.000',
  },
  {
    id: '4',
    user: fakeCoach,
    training: training.data[0],
    rating: 5,
    text: 'Регулярно выполняю эту тренировку дома и вижу результат! Спина стала прямее, появилось больше сил и гибкость тоже стала лучше хотя упражнения довольно простые.',
    createdAt: '2012-01-01T00:00:00.000',
  },
  {
    id: '5',
    user: fakeCoach,
    training: training.data[0],
    rating: 5,
    text: 'Ну&nbsp;какой же кайф! Спасибо, крутая программа. С музыкой вообще супер! Действительно, Energy!',
    createdAt: '2012-01-01T00:00:00.000',
  },
  {
    id: '6',
    user: fakeCoach,
    training: training.data[0],
    rating: 5,
    text: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.',
    createdAt: '2012-01-01T00:00:00.000',
  },
];
