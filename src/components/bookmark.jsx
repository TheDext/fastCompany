import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmarkStatus, method }) => {
  return (
    <button
      onClick={method}
      className={`bi bi-bookmark${bookmarkStatus ? '-fill' : ''}`}
    />
  );
};

Bookmark.propTypes = {
  bookmarkStatus: PropTypes.bool,
  method: PropTypes.func
};

export default Bookmark;
