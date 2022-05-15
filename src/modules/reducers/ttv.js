import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
    ttvList: [],
    selectedTTV: undefined,
    isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case t.MODAL_OPEN:
            return {
                ...state,
                isModalOpen: action.payload,
            };
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
            const updatedTTV = state.ttvList.map((ttv) => {
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
            });

            return { ...state, ttvList: updatedTTV };
        case t.TTV_DELETE_SUCCEEDED:
            const newTTVList = state.ttvList.filter(
                (ttv) => ttv._id !== action.payload
            );
            return {
                ...state,
                ttvList: newTTVList,
            };
        case t.TTV_SELECTED:
            const selectedTTV = state.ttvList.find(
                (ttv) => ttv._id === action.payload
            );
            return {
                ...state,
                selectedTTV,
            };
        default:
            return state;
    }
};

export default mainReducer;