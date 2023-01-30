import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { CommentsProvider } from "../../../hooks/useComments";
import { getUserId } from "../../../services/localStorage.service";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const { updateUser } = useAuth();
    const { getUserById } = useUser();
    const loggedUserId = getUserId();

    async function getUser() {
        try {
            const content = await updateUser();
            console.log("userPage_getUser_content");
            return content;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userId === loggedUserId
            ? getUser().then((data) => setUser(data))
            : setUser(getUserById(userId));
    }, [userId]);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
