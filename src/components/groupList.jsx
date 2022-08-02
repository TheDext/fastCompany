import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({ items, selectedItem, onItemSelect, valueProperty, contentProperty }) => {
  console.log('items', items);

  return (
    <ul className="list-group">
      {Object.keys(items).map(item => {
        return (
          <li
            key={items[item][valueProperty]}
            className={`list-group-item ${selectedItem === items[item] ? 'active' : ''}`}
            onClick={() => onItemSelect(items[item])}
            role='button'
          >
            {items[item][contentProperty]}
          </li>
        );
      })}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })).isRequired,
    PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })).isRequired
  ]),
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string
};

export default GroupList;
