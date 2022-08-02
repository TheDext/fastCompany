import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './bookmark';
import Qualitie from './qualitie';

const User = ({ user, onToggleBookmark, onDelete }) => {
  const { name, qualities, profession, completedMeetings, rate, bookmark } =
    user;
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((q) => (
          <Qualitie {...q} key={q._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td>
        <Bookmark bookmarkStatus={bookmark} method={onToggleBookmark} />
      </td>
      <td>
        <button onClick={onDelete} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default User;
