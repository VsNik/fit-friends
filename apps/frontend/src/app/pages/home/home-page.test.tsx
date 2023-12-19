import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Role, SlidesMaxCount } from '@fit-friends/shared';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { HomePage } from './home-page';
import { SliceName } from '../../constants/common';
import { makeFakeTrainingCollection, makeFakeUserCollection } from '../../utils/mock-data';
import { RouteName } from '../../constants/route';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
history.push(RouteName.Home)

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockHomePage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </Router>
  );
};

describe('Component: Home page', () => {
    const mockForYouTrainings = makeFakeTrainingCollection(SlidesMaxCount.ForUser).data;
    const mockSpecialTrainings = makeFakeTrainingCollection(SlidesMaxCount.Special).data;
    const mockPopularTrainings = makeFakeTrainingCollection(SlidesMaxCount.Popular).data;
    const mockCompanyUsers = makeFakeUserCollection(SlidesMaxCount.Company).data;

    const store = mockStore({ 
        [SliceName.Auth]: { authRole: Role.User },
        [SliceName.ForYou]: {trainings: mockForYouTrainings},
        [SliceName.Special]: {trainings: mockSpecialTrainings},
        [SliceName.Popular]: {trainings: mockPopularTrainings},
        [SliceName.Users]: {users: mockCompanyUsers},
        [SliceName.Notifications]: {},
    });

  it('', () => {
    render(<MockHomePage store={store} />);

    const forYouSlides = screen.getAllByTestId('thumbnail-training-anons');
    expect(forYouSlides.length).toEqual(mockForYouTrainings.length);

    const specialSlides = screen.getAllByTestId('promo-image');
    expect(specialSlides.length).toEqual(mockSpecialTrainings.length);

    const popularSlides = screen.getAllByTestId('thumbnail-training');
    expect(popularSlides.length).toEqual(mockPopularTrainings.length);

    const companyUsers = screen.getAllByTestId('thumbnail-user');
    expect(companyUsers.length).toEqual(mockCompanyUsers.length);
  });

  it('Dispatch at first render', () => {
    render(<MockHomePage store={store} />);
    expect(mockDispatch).toBeCalled();
    mockDispatch.mockClear();
  })
});
