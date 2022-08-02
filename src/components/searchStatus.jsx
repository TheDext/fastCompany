import React from 'react';
import PropTypes from 'prop-types';
import { wordDeclension } from '../utils/wordDeclension';

const SearchStatus = ({ usersQuantity }) => {
  if (!usersQuantity) {
    return (
      <span className="badge bg-danger p-2">Никто с тобой не тусанет</span>
    );
  }
  return (
    <div className="badge bg-primary p-2">
      {usersQuantity}
      {wordDeclension(usersQuantity, [
        ' человек тусанет ',
        ' человека тусанут ',
        ' человек тусанет '
      ])}
      c тобой сегодня
    </div>
  );
};

SearchStatus.propTypes = {
  usersQuantity: PropTypes.number
};

export default SearchStatus;
