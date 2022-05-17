import { put, takeLatest } from 'redux-saga/effects';
import * as t from '../types';

function* fetchTTVs() {
  try {
    const response = yield fetch('/api/ttv');

    const ttvList = yield response.json();

    yield put({
      type: t.TTV_FETCH_SUCCEEDED,
      payload: ttvList.data,
    });
  } catch (error) {
    yield put({
      type: t.TTV_FETCH_FAILED,
      payload: error.message,
    });
  }
}

export function* watchFetchTTVs() {
  yield takeLatest(t.TTV_FETCH_REQUESTED, fetchTTVs);
}

function* addTTV(action) {
  try {
    const response = yield fetch('/api/ttv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    const newTTV = yield response.json();

    yield put({
      type: t.TTV_ADD_SUCCEEDED,
      payload: newTTV.data,
    });
  } catch (error) {
    yield put({
      type: t.TTV_ADD_FAILED,
      payload: error.message,
    });
  }
}

export function* watchAddTTV() {
  yield takeLatest(t.TTV_ADD_REQUESTED, addTTV);
}

function* deleteTTV(action) {
  try {
    const response = yield fetch('/api/ttv/' + action.payload, {
      method: 'DELETE',
    });

    const deletedTTV = yield response.json();

    yield put({
      type: t.TTV_DELETE_SUCCEEDED,
      payload: deletedTTV.data.id,
    });
  } catch (error) {
    yield put({
      type: t.TTV_DELETE_FAILED,
      payload: error.message,
    });
  }
}

export function* watchRemoveTTV() {
  yield takeLatest(t.TTV_DELETE_REQUESTED, deleteTTV);
}

function* updateTTV(action) {
  try {
    const response = yield fetch('/api/ttv/' + action.payload._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    const updatedTTV = yield response.json();

    yield put({
      type: t.TTV_UPDATE_SUCCEEDED,
      payload: updatedTTV.data,
    });
  } catch (error) {
    yield put({
      type: t.TTV_UPDATE_FAILED,
      payload: error.message,
    });
  }
}

export function* watchUpdateTTV() {
  yield takeLatest(t.TTV_UPDATE_REQUESTED, updateTTV);
}
