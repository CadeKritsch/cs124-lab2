import React, { useState } from "react";
import PropTypes from "prop-types";

import "./todo-item.css";

const TodoItem = (props) => {
  const [updatedName, setUpdatedName] = useState("");
  const [isRenameClicked, setIsRenameClicked] = useState(false);
  return (
    <>
      <div className="item-container">
        <div
          className={`item ${
            props.isCompleted === true ? "completed-item" : null
          }`}
          onClick={() => {
            props.onItemChange(
              props.id,
              "isCompleted",
              props.isCompleted ? false : true
            );
          }}
        >
          {props.name}
        </div>
        {isRenameClicked ? (
          <>
            <input
              type="text"
              name="updated-name"
              id="updated-name"
              value={updatedName}
              onChange={(e) => {
                setUpdatedName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                props.onItemChange(props.id, "itemName", updatedName);
                setIsRenameClicked(false);
              }}
            >
              Rename
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setIsRenameClicked((prevState) => !prevState);
            }}
          >
            Rename
          </button>
        )}
      </div>
    </>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  id: PropTypes.string,
  onItemChange: PropTypes.func,
};

export default TodoItem;
