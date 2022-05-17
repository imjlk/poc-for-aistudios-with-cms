import { combineReducers } from 'redux';
import aistudiosReducer from './aistudios';
import ttvReducer from './ttv';

const rootReducer = combineReducers({
  aistudios: aistudiosReducer,
  ttv: ttvReducer,
});

export default rootReducer;
