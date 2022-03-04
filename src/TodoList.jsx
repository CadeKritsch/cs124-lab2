import React, { useState } from "react";
import PropTypes from "prop-types";

import TodoItem from "./TodoItem";
import "./todo-list.css";

const TodoList = (props) => {
  return (
    <>
      <div className="list-container">
        {props.isCompletedShown
          ? props.data.map((item) => {
              return (
                <>
                  <TodoItem
                    key={item.id}
                    name={item.itemName}
                    id={item.id}
                    status={item.itemStatus}
                    onItemChange={props.onItemChange}
                  />
                </>
              );
            })
          : props.data.map((item) => {
              return item.itemStatus === false ? (
                <TodoItem
                  key={item.id}
                  name={item.itemName}
                  id={item.id}
                  status={item.itemStatus}
                  onItemChange={props.onItemChange}
                />
              ) : null;
            })}
      </div>
    </>
  );
};

TodoList.propTypes = {
  data: PropTypes.array.isRequired,
  onItemChange: PropTypes.func,
  isCompletedShown: PropTypes.bool,
};

export default TodoList;
