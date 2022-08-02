import React, { useEffect, useState } from 'react';
import api from './api';
import Users from './components/users';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter(({ _id }) => _id !== id));
  };

  const handleToggleBookmark = (id) => {
    console.log(id);

    setUsers(
      users.map((user) => {
        user._id === id && (user.bookmark = !user.bookmark);
        return user;
      })
    );
  };

  return (
    <>
      {users.length > 0 && (
        <Users
          users={users}
          onHandleDelete={handleDelete}
          onHandleToggleBookmark={handleToggleBookmark}
        />
      )}
    </>
  );
}

export default App;
