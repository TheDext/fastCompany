import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    useEffect(() => {
        const objIndex = users.findIndex(
            (userObject) => userObject._id === currentUser._id
        );
        // users[objIndex] = currentUser;
        setUsers((prevState) => [
            ...prevState,
            (prevState[objIndex] = currentUser)
        ]);
        // Подскажи пожалуйста, корректно ли будет изменить состояние users, воспользовавшись
        // users[objIndex] = currentUser
        // вместо
        // setUsers((prevState) => [
        // ...prevState,
        // (prevState[objIndex] = currentUser)
        // ]);
        // Вроде работает и без использования setUsers
    }, [currentUser]);
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getUsers() {
        try {
            const { content } = await userService.get();
            // console.log("useUsers_getUsers_content", content);
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
