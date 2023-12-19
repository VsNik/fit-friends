import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { VideoPlayer } from './video-payer';
import { makeFakeTraining } from '../../../utils/mock-data';
import userEvent from '@testing-library/user-event';
import { VIDEO_POSTER } from '../../../constants/common';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockSetPlaying = jest.fn();
const mockOnPlay = jest.fn();
const mockOnEnded = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const fakeTraining = makeFakeTraining();
const store = mockStore({});

const MockVideoPlayer = ({ isReady, isPlaying }: { isReady: boolean; isPlaying: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <VideoPlayer
          src={fakeTraining.video}
          poster={VIDEO_POSTER}
          isReady={isReady}
          isPlaying={isPlaying}
          onPlay={mockOnPlay}
          onEnded={mockOnEnded}
          setPlaying={mockSetPlaying}
          videoRef={null}
        />
      </Provider>
    </Router>
  );
};

describe('Component: Video player', () => {
  it('Correct render component', () => {
    render(<MockVideoPlayer isPlaying={false} isReady={false} />);
    expect(screen.getByTestId('training-video-element')).toBeInTheDocument();
    expect(screen.getByTestId('play-video-button')).toBeInTheDocument();
    expect(screen.getByTestId('play-video-button').classList.contains('is-disabled')).toBe(true);
  });

  it('Enabled play button if passed isReady parametr', () => {
    render(<MockVideoPlayer isPlaying={false} isReady={true} />);
    expect(screen.getByTestId('play-video-button').classList.contains('is-disabled')).toBe(false);
  });

  it('Hide play button if passed isPaying parametr', () => {
    render(<MockVideoPlayer isPlaying={true} isReady={true} />);
    expect(screen.queryByTestId('play-video-button')).not.toBeInTheDocument();
  });

  it('Click to play button', async () => {
    render(<MockVideoPlayer isPlaying={false} isReady={true} />);
    await userEvent.click(screen.getByTestId('play-video-button'));
    expect(mockOnPlay).toHaveBeenCalledTimes(1);
  });
});
