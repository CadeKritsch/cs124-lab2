import React from 'react';
import PropTypes from 'prop-types';

import './todo-item.css';

const TodoItem = (props) => {
  return (
    <>
      <div
        className={`item-container ${props.status === true ? 'completed-item' : null}`}
        onClick={() => {
          props.onItemChange(props.id, 'itemStatus', props.status ? false : true);
        }}>
        {props.name}
      </div>
    </>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string,
  status: PropTypes.bool,
  id: PropTypes.string,
  onItemChange: PropTypes.func
};

export default TodoItem;
