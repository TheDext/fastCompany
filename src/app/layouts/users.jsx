import React from "react";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import { getUserId } from "../services/localStorage.service";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const loggedUserId = getUserId();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === loggedUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${loggedUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
