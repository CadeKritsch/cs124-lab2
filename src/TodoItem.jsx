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
          className={`item ${props.status === true ? "completed-item" : null}`}
          onClick={() => {
            props.onItemChange(
              props.id,
              "itemStatus",
              props.status ? false : true
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
  status: PropTypes.bool,
  id: PropTypes.string,
  onItemChange: PropTypes.func,
};

export default TodoItem;
