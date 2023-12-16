import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingVideo } from './training-video';
import { Role } from '@fit-friends/shared';
import { makeFakeTraining } from '../../../utils/mock-data';
import React from 'react';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockSetIsEditable = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const fakeTraining = makeFakeTraining();
const store = mockStore({});

interface MockTrainingVideoProps {
  role: Role;
  isEditable?: boolean;
  isPositiveBalance?: boolean;
}

const MockTrainingVideo: React.FC<MockTrainingVideoProps> = ({ role, isEditable = false, isPositiveBalance = false }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TrainingVideo
          trainingId={fakeTraining.id}
          video={fakeTraining.video}
          role={role}
          isEditable={isEditable}
          isPositiveBalance={isPositiveBalance}
          setIsEditable={mockSetIsEditable}
        />
      </Provider>
    </Router>
  );
};

describe('Component: Training video', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
  });

  it('Correct render elements', () => {
    render(<MockTrainingVideo role={Role.User} isEditable={false} />);

    expect(screen.getByText('Видео')).toBeInTheDocument();
    expect(screen.getByTestId('training-video-element')).toBeInTheDocument();
    expect(screen.getByTestId('play-video-button')).toBeInTheDocument();
    expect(screen.getByTestId('play-video-button').classList.contains('is-disabled')).toBe(true);
    expect(screen.getByTestId('start-training-button')).toBeInTheDocument();
    expect(screen.getByTestId('start-training-button')).toBeDisabled();
    expect(screen.getByTestId('end-training-button')).toBeInTheDocument();
    expect(screen.queryByTestId('save-video-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('remove-video-button')).not.toBeInTheDocument();
  });

  it('Enabled start button if passed isPositiveBalance parametr', () => {
    render(<MockTrainingVideo role={Role.User} isEditable={false} isPositiveBalance />);

    expect(screen.getByTestId('start-training-button')).not.toBeDisabled();
  })

  it('Dispatch and unblock/block play button, if click to start/end button', async () => {
    render(<MockTrainingVideo role={Role.User} isPositiveBalance={true} />);

    expect(screen.getByTestId('start-training-button')).not.toBeDisabled();

    await userEvent.click(screen.getByTestId('start-training-button'));
    expect(screen.getByTestId('play-video-button').classList.contains('is-disabled')).toBe(false);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockReset();

    await userEvent.click(screen.getByTestId('end-training-button'));
    expect(screen.getByTestId('play-video-button').classList.contains('is-disabled')).toBe(true);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockReset();
  });

  it('Edit mod if passet isEditable parametr', () => {
    render(<MockTrainingVideo role={Role.Coach} isPositiveBalance={true} />);

    expect(screen.getByTestId('save-video-button')).toBeInTheDocument();
    expect(screen.getByTestId('save-video-button')).toBeDisabled();
    expect(screen.getByTestId('remove-video-button')).toBeInTheDocument();
  });

  it('Dispatch and show upload video field, if click to "Delete" button', async () => {
    render(<MockTrainingVideo role={Role.Coach} isPositiveBalance={true} />);

    await userEvent.click(screen.getByTestId('remove-video-button'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockReset();

    expect(screen.getByTestId('save-video-button')).not.toBeDisabled();
    expect(screen.getByTestId('remove-video-button')).toBeDisabled();
    expect(screen.getByTestId('input-video-file-block')).toBeInTheDocument();
  })
});
