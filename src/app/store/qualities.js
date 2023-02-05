import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        errors: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequest: (state) => {
            state.isLoading = true;
        },
        qualitiesReceive: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        qualitiesRequestFailed: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const isOutdated = (date) => {
    if (Date.now() - date > 1 * 60 * 1000) return true;
    return false;
};

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
export const { qualitiesRequest, qualitiesReceive, qualitiesRequestFailed } =
    actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;

    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequest());
        try {
            const { content } = await qualityService.fetchAll();
            dispatch(qualitiesReceive(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            qualitiesArray.push(
                state.qualities.entities.find((q) => q._id === qualId)
            );
        }
        return qualitiesArray;
    }
    return [];
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export default qualitiesReducer;
