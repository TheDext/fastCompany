import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        errors: null,
        isLoading: null
    },
    reducers: {
        commentsRequest: (state) => {
            state.isLoading = true;
        },
        commentsReceive: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        commentCreate: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentCreateFailed: (state, action) => {
            state.errors = action.payload;
        },
        commentRemove: (state, action) => {
            console.log(action);
            state.entities = action.payload;
        },
        commentRemoveFailed: (state, action) => {
            state.errors = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequest,
    commentsReceive,
    commentsRequestFailed,
    commentCreate,
    commentCreateFailed,
    commentRemove,
    commentRemoveFailed
} = actions;

const createCommentRequest = createAction("comments/createCommentRequest");
const removeCommentRequest = createAction("comments/removeCommentRequest");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequest());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceive(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export const createComment =
    (commentData, pageId, userId) => async (dispatch) => {
        dispatch(createCommentRequest());
        try {
            const comment = {
                content: commentData,
                _id: nanoid(),
                pageId: pageId,
                created_at: Date.now(),
                userId: userId,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`
            };
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreate(content));
        } catch (error) {
            dispatch(commentCreateFailed(error.message));
        }
    };
export const removeComment = (commentId) => async (dispatch, getState) => {
    dispatch(removeCommentRequest());
    const commentsState = getState().comments.entities;
    const newState = commentsState.filter((c) => c._id !== commentId);
    try {
        await commentService.removeComment(commentId);
        dispatch(commentRemove(newState));
    } catch (error) {
        dispatch(commentRemoveFailed(error));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
