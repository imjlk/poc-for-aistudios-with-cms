import { HYDRATE } from 'next-redux-wrapper';
import * as t from '../types';

const initialState = {
  token: null,
  tokenExpire: -1,
  models: null,
  model: undefined,
  text: undefined,
  key: undefined,
  duration: undefined,
  progress: '',
  video: undefined,
  makeVideoSucceed: false,
  findProjectSucceed: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.AISTUDIOS_TOKEN_SUCCEEDED:
      return {
        ...state,
        token: action.payload.data.token,
        tokenExpire: action.payload.data.tokenExpire,
      };
    case t.AISTUDIOS_MODELS_SUCCEEDED:
      return {
        ...state,
        models: action.payload.data.models,
      };
    case t.AISTUDIOS_VIDEO_SUCCEEDED:
      return {
        ...state,
        makeVideoSucceed: action.payload.succeed,
        key: action.payload.data.key,
        video: undefined,
      };
    case t.AISTUDIOS_PROJECT_SUCCEEDED:
      return {
        ...state,
        findProjectSucceed: action.payload.data.succeed,
        duration: action.payload.data.data.duration,
        progress: action.payload.data.data.progress,
        video: action.payload.data.data.video,
      };
    default:
      return state;
  }
};

export default mainReducer;
