import * as t from "../types";

export const fetchTTVs = () => {
    return {
        type: t.TTV_FETCH_REQUESTED,
    };
};

export const addTTV = (ttv) => {
    return {
        type: t.TTV_ADD_REQUESTED,
        payload: ttv,
    };
};

export const updateTTV = (ttv) => {
    return {
        type: t.TTV_UPDATE_REQUESTED,
        payload: ttv,
    };
};

export const deleteTTV = (id) => {
    return {
        type: t.TTV_DELETE_REQUESTED,
        payload: id,
    };
};

export const setSelectedTTV = (id) => {
    return {
        type: t.TTV_SELECTED,
        payload: id,
    };
};