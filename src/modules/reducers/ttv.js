import { HYDRATE } from 'next-redux-wrapper';

import * as t from '../types';

const initialState = {
  targetPostId: null,
  language: null,
  model: null,
  clothes: null,
  text: null,
  isCompleted: false,
  videoUrl: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.TTV_FETCH_SUCCEEDED:
      return {
        ...state,
        ttvList: action.payload,
      };
    case t.TTV_ADD_SUCCEEDED:
      return {
        ...state,
        ttvList: [action.payload, ...state.ttvList],
      };
    case t.TTV_UPDATE_SUCCEEDED:
      return {
        ...state,
        ttvList: state.ttvList.map((ttv) => {
          if (ttv._id === action.payload._id) {
            return {
              ...ttv,
              name: action.payload.name,
              email: action.payload.email,
              address: action.payload.address,
              phone: action.payload.phone,
            };
          }
          return ttv;
        }),
      };
    case t.TTV_DELETE_SUCCEEDED:
      return {
        ...state,
        ttvList: state.ttvList.filter((ttv) => ttv._id !== action.payload),
      };
    case t.TTV_SELECTED:
      return {
        ...state,
        selectedTTV: state.ttvList.find((ttv) => ttv._id === action.payload),
      };
    default:
      return state;
  }
};

export default mainReducer;
