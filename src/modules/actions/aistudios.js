import * as t from '../types';

export const generateClientToken = () => {
  return {
    type: t.AISTUDIOS_TOKEN_REQUESTED,
  };
};

export const getModelList = () => {
  return {
    type: t.AISTUDIOS_MODELS_REQUESTED,
    // payload: { token },
  };
};

export const makeVideo = (model, text, language) => {
  return {
    type: t.AISTUDIOS_VIDEO_REQUESTED,
    payload: { model, text, language },
  };
};

export const findProject = (token, key) => {
  return {
    type: t.DEEP_BRAIN_PROJECT_REQUESTED,
    payload: { token, key },
  };
};
