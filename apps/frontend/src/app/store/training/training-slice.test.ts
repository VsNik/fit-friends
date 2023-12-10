import { ITraining } from '@fit-friends/shared';
import { TrainingState } from '../../types/state-type';
import { LoadStatus } from '../../constants/common';
import { notificationsSlice } from '../notifications/notifications-slice';
import { UNKNOWN_ACTION, fakeError, makeFakeTraining } from '../../utils/mock-data';
import { trainingSlice } from './training-slice';
import { createTrainingAction, fetchTrainingAction, removeVideoAction, saveVideoAction, updateTrainingAction } from './async-actions';

describe('TrainingSlice test', () => {
  let state: TrainingState;

  beforeEach(() => {
    state = {
      training: {} as ITraining,
      loadStatus: LoadStatus.Never,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(notificationsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({notifications: [], page: 1, total: 0, loadStatus: LoadStatus.Never});
  });

  describe('fetchTrainingAction', () => {
    it('should be change loadStatus to Loading if fetchTrainingAction pending', function () {
      expect(trainingSlice.reducer(state, {type: fetchTrainingAction.pending.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update training if fetchTrainingAction fulfilled', function () {
      const fakeTraining = makeFakeTraining();
      expect(trainingSlice.reducer(state, {type: fetchTrainingAction.fulfilled.type, payload: fakeTraining}))
        .toEqual({training: fakeTraining, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if fetchTrainingAction rejected', function () {
      expect(trainingSlice.reducer(state, {type: fetchTrainingAction.rejected.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loaded, error: null})
    });
  });

  describe('createTrainingAction error', () => {
    it('should be change loadStatus to Loading if createTrainingAction pending', function () {
      expect(trainingSlice.reducer(state, {type: createTrainingAction.pending.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update training if createTrainingAction fulfilled', function () {
      const fakeTraining = makeFakeTraining();
      expect(trainingSlice.reducer(state, {type: createTrainingAction.fulfilled.type, payload: fakeTraining}))
        .toEqual({training: fakeTraining, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if createTrainingAction rejected', function () {
      expect(trainingSlice.reducer(state, {type: createTrainingAction.rejected.type, payload: fakeError}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loaded, error: fakeError})
    });
  })

  describe('updateTrainingAction test', () => {
    it('should be change loadStatus to Loading if updateTrainingAction pending', function () {
      expect(trainingSlice.reducer(state, {type: updateTrainingAction.pending.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update training if updateTrainingAction fulfilled', function () {
      const fakeTraining = makeFakeTraining();
      expect(trainingSlice.reducer(state, {type: updateTrainingAction.fulfilled.type, payload: fakeTraining}))
        .toEqual({training: fakeTraining, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if updateTrainingAction rejected', function () {
      expect(trainingSlice.reducer(state, {type: updateTrainingAction.rejected.type, payload: fakeError}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loaded, error: fakeError})
    });
  });

  describe('removeVideoAction test', function () {
    it('should be change loadStatus to Loading if removeVideoAction pending', function () {
      expect(trainingSlice.reducer(state, {type: removeVideoAction.pending.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update training if removeVideoAction fulfilled', function () {
      const fakeTraining = makeFakeTraining();
      expect(trainingSlice.reducer(state, {type: removeVideoAction.fulfilled.type, payload: fakeTraining}))
        .toEqual({training: fakeTraining, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if removeVideoAction rejected', function () {
      expect(trainingSlice.reducer(state, {type: removeVideoAction.rejected.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loaded, error: null})
    });
  });

  describe('saveVideoAction test', function () {
    it('should be change loadStatus to Loading if saveVideoAction pending', function () {
      expect(trainingSlice.reducer(state, {type: saveVideoAction.pending.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update training if saveVideoAction fulfilled', function () {
      const fakeTraining = makeFakeTraining();
      expect(trainingSlice.reducer(state, {type: saveVideoAction.fulfilled.type, payload: fakeTraining}))
        .toEqual({training: fakeTraining, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if saveVideoAction rejected', function () {
      expect(trainingSlice.reducer(state, {type: saveVideoAction.rejected.type}))
        .toEqual({training: {} as ITraining, loadStatus: LoadStatus.Loaded, error: null})
    });
  });
});
