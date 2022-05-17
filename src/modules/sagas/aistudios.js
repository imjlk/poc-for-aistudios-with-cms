import { put, takeLatest } from 'redux-saga/effects';
import * as t from '../types';

function* generateClientToken() {
  try {
    const response = yield fetch('/api/aistudios/generate-client-token');
    const data = yield response.json();

    yield put({
      type: t.AISTUDIOS_TOKEN_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: t.AISTUDIOS_TOKEN_FAILED,
      payload: error.message,
    });
  }
}

export function* watchGenerateClientToken() {
  yield takeLatest(t.AISTUDIOS_TOKEN_REQUESTED, generateClientToken);
}

function* getModelList(action) {
  try {
    const response = yield fetch('/api/aistudios/models', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();

    yield put({
      type: t.AISTUDIOS_MODELS_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: t.AISTUDIOS_MODELS_FAILED,
      payload: error.message,
    });
  }
}

export function* watchGetModelList() {
  yield takeLatest(t.AISTUDIOS_MODELS_REQUESTED, getModelList);
}

function* makeVideo(action) {
  try {
    const response = yield fetch('/api/aistudios/make-video', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();

    yield put({
      type: t.AISTUDIOS_TOKEN_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: t.AISTUDIOS_VIDEO_FAILED,
      payload: error.message,
    });
  }
}

export function* watchMakeVideo() {
  yield takeLatest(t.AISTUDIOS_VIDEO_REQUESTED, makeVideo);
}

function* findProject(action) {
  try {
    const response = yield fetch('/aistudios/find-project', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();

    yield put({
      type: t.AISTUDIOS_PROJECT_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: t.AISTUDIOS_PROJECT_FAILED,
      payload: error.message,
    });
  }
}

export function* watchFindProject() {
  yield takeLatest(t.AISTUDIOS_PROJECT_REQUESTED, findProject);
}
