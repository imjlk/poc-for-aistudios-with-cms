import { all } from 'redux-saga/effects';
import {
  watchFindProject,
  watchGenerateClientToken,
  watchGetModelList,
  watchMakeVideo,
} from './aistudios';
import {
  watchAddTTV,
  watchFetchTTVs,
  watchRemoveTTV,
  watchUpdateTTV,
} from './ttv';

export default function* rootSaga() {
  yield all([
    watchFetchTTVs(),
    watchAddTTV(),
    watchRemoveTTV(),
    watchUpdateTTV(),

    watchGenerateClientToken(),
    watchGetModelList(),
    watchMakeVideo(),
    watchFindProject(),
  ]);
}
