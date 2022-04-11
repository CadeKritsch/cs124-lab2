import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCollectionData } from "react-firebase-hooks/firestore";

import TodoItem from "./TodoItem";
import "./todo-list.css";

const TodoList = (props) => {
  // appropriate todo items are grabbed using the path to the appropriate list passed in via props
  const [todoItems] = useCollectionData(props.todoItemsRef);
  const [isRenameClicked, setIsRenameClicked] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  // console.log(todoItems);
  return (
    <>
      <div className="list-container">
        <div>
          <div tabindex="0" className="list-name">{props.listName}</div>
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
                  props.onListNameChange(props.listId, updatedName);
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
        {props.isCompletedShown
          ? todoItems?.map((item) => {
              return (
                <>
                  <TodoItem
                    key={item.id}
                    name={item.itemName}
                    id={item.id}
                    isCompleted={item.isCompleted}
                    onItemChange={props.onItemChange}
                  />
                </>
              );
            })
          : todoItems?.map((item) => {
              return item.isCompleted === false ? (
                <TodoItem
                  key={item.id}
                  name={item.itemName}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  onItemChange={props.onItemChange}
                />
              ) : null;
            })}
      </div>
    </>
  );
};

TodoList.propTypes = {
  onItemChange: PropTypes.func,
  onItemAdd: PropTypes.func,
  isCompletedShown: PropTypes.bool,
  listName: PropTypes.string,
  listId: PropTypes.string,
  todoItemsRef: PropTypes.object,
};

export default TodoList;
