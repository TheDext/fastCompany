import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const dispatch = useDispatch();
    const { userId: pageId } = useParams();
    const comments = useSelector(getComments());
    const userId = useSelector(getCurrentUserId());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const handleSubmit = ({ content }) => {
        dispatch(createComment(content, pageId, userId));
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    useEffect(() => {
        dispatch(loadCommentsList(pageId));
    }, [pageId]);

    if (isLoading) return "Comments is Loading...";
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
