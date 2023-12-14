import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThumbnailTraining } from './thumbnail-training';
import { ITraining } from '@fit-friends/shared';
import { makeFakeTraining } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { getPriceView, getTrainingName } from '../../../utils/helpers';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockThumbnailTraining = ({ store, training, statistic }: { store: MockStore; training: ITraining, statistic?: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ThumbnailTraining training={training} statistic={statistic} />
      </Provider>
    </Router>
  );
};

describe('Component: Thumbnail Training', () => {
  it('correct render екфштштп вфеф', () => {
    const fakeTraining = makeFakeTraining();

    const store = mockStore({
      [SliceName.Training]: { training: fakeTraining },
    });

    render(<MockThumbnailTraining store={store} training={fakeTraining} />);

    expect(screen.getByTestId('training-image')).toHaveAttribute('src', fakeTraining.bgImage);
    expect(screen.getByTestId('thubnail-training-price').textContent).toEqual(getPriceView(fakeTraining.price));
    expect(screen.getByTestId('thumbnail-training-title').textContent).toEqual(fakeTraining.title);
    expect(screen.getByTestId('thumbnail-training-type').textContent).toEqual(`#${getTrainingName(fakeTraining.type)}`);
    expect(screen.getByTestId('thumbnail-training-calory').textContent).toEqual(`#${fakeTraining.calories} кал`);
    expect(screen.getByTestId('thumbnail-training-rating').textContent).toEqual(`${fakeTraining.rating}`);
    expect(screen.getByTestId('yhumbnail-training-desc').textContent).toEqual(fakeTraining.description);

    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });

  it('show training statistic', () => {
    const MOCK_ORDERS = 2;
    const MOCK_SUMM = 200;
    const fakeTraining = {...makeFakeTraining(), ordersCount: MOCK_ORDERS, ordersSumm: MOCK_SUMM};
    
    const store = mockStore({
      [SliceName.Training]: { training: fakeTraining },
    });

    render(<MockThumbnailTraining store={store} training={fakeTraining} statistic />);

    expect(screen.getByText('Куплено тренировок')).toBeInTheDocument();
    expect(screen.getByTestId('training-orders').textContent).toEqual(`${fakeTraining.ordersCount}`);
    expect(screen.getByText('Общая сумма')).toBeInTheDocument();
    expect(screen.getByTestId('training-total-summ').textContent).toEqual(`${fakeTraining.ordersSumm}₽`);
  });
});
