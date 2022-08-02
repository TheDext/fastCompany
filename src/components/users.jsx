import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import User from './user';
import api from '../api/index';
import GroupList from './groupList';
import SearchStatus from './searchStatus';

const Users = ({ users, onHandleDelete, onHandleToggleBookmark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState(api.professions.fetchAll());
  const [selectedProfession, setSelectedProfession] = useState();
  
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfession]);

  const handlePageChange = pageIndex => setCurrentPage(pageIndex);
  const handleProfessionSelect = item => setSelectedProfession(item);
  
  const pageSize = 4;

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const filteredUsers = () => {
    if (!selectedProfession) return users;

    return Array.isArray(professions)
      ? users.filter(user => user.profession._id === selectedProfession._id)
      : users.filter(user => user.profession === selectedProfession);
  };
  
  console.log('filteredUsers', filteredUsers());

  const count = filteredUsers().length;
  const userCrop = paginate(filteredUsers(), currentPage, pageSize);
  const clearFilter = () => setSelectedProfession();

  return (
    <div className='d-flex'>
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items = { professions }
            selectedItem = {selectedProfession}
            onItemSelect = {handleProfessionSelect}
          />
          <button className='btn btn-secondary mt-2' onClick={clearFilter}>Очистить</button>
        </div>
      )}

      <div className="d-flex flex-column">
        <SearchStatus usersQuantity={count} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map(({ _id, ...user }) => (
              <User
                key={_id}
                onDelete={() => onHandleDelete(_id)}
                onToggleBookmark={() => onHandleToggleBookmark(_id)}
                user={user}
              />
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    bookmark: PropTypes.bool,
    completedMeetings: PropTypes.number,
    name: PropTypes.string,
    profession: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string
    }),
    qualities: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      _id: PropTypes.string
    }))
  })).isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  onHandleToggleBookmark: PropTypes.func.isRequired
};

export default Users;
