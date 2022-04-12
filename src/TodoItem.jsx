import React, { useState } from "react";
import PropTypes from "prop-types";

import "./todo-item.css";

const TodoItem = (props) => {
  const [updatedName, setUpdatedName] = useState("");
  const [isRenameClicked, setIsRenameClicked] = useState(false);
  /* const [toggleCompleted, setToggleCompleted] = useState(props.isCompleted);
  const handleSetToggleCompleted =() => {
    setToggleCompleted((prevState) => !prevState);
  } */
  return (
    <>
      <div className="item-container">
        <div
          tabindex="0"
          onKeyPress={() => {
            props.onItemChange(props.id, "isCompleted", !props.isCompleted);
          }}
          aria-roledescription="ListItem"
          className={`item ${
            props.isCompleted === true ? "completed-item" : null
          }`}
          onClick={() => {
            props.onItemChange(props.id, "isCompleted", !props.isCompleted);
          }}
        >
          {props.name}
        </div>
        {isRenameClicked ? (
          <>
            <input
              tabindex="0"
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
