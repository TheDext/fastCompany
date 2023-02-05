import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        errors: null,
        isLoading: null,
        lastFetch: null
    },
    reducers: {
        professionRequest: (state) => {
            state.isLoading = true;
        },
        professionReceive: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        professionRequestFailed: (state, action) => {
            state.errors = action.payload;
        }
    }
});

const { reducer: professionReducer, actions } = professionsSlice;
const { professionRequest, professionReceive, professionRequestFailed } =
    actions;

const isOutdated = (date) => {
    if (Date.now() - date > 1 * 60 * 1000) return true;
    return false;
};

export const loadProfessionList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;

    if (isOutdated(lastFetch)) {
        dispatch(professionRequest());
        try {
            const { content } = await professionService.get();
            dispatch(professionReceive(content));
        } catch (error) {
            dispatch(professionRequestFailed(error.message));
        }
    }
};

export const getProfessionsLoadStatus = () => (state) => {
    return state.professions.isLoading;
};
export const getProfessions = () => (state) => {
    return state.professions.entities;
};

export default professionReducer;
