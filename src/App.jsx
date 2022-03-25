import React, { useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TodoList from "./TodoList";
import MenuPopupState from "./Menu";
import {
  collection,
  doc,
  query,
  getDocs,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase.jsx";

// const INITIAL_DATA = [
//   {
//     itemName: "default item",
//     itemStatus: false,
//     id: generateUniqueID(),
//   },
//   {
//     itemName: "another item",
//     itemStatus: false,
//     id: generateUniqueID(),
//   },
//   {
//     itemName: "and another item",
//     itemStatus: true,
//     id: generateUniqueID(),
//   },
// ];

const App = () => {
  // const [todoItems, setTodoItems] = useState(INITIAL_DATA);
  const TODO_ITEMS_PATH = "/users/test-user/todo-items";
  const todoItemsRef = collection(db, TODO_ITEMS_PATH);
  const [todoItems, loading, error] = useCollectionData(todoItemsRef);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [newItemNameInput, setNewItemNameInput] = useState("");
  const [isCompletedShown, setIsCompletedShown] = useState(true);
  const [priorityInput, setPriorityInput] = useState(0);

  const handleItemChange = (id, field, value) => {
    // const newTodoItems = todoItems.map((item) => {
    //   return item.id === id ? { ...item, [field]: value } : item;
    // });
    // setTodoItems(newTodoItems);
    const changedDocRef = doc(db, `${TODO_ITEMS_PATH}/${id}`);
    updateDoc(changedDocRef, {
      [field]: value,
    });
  };

  const handleItemAdd = (name) => {
    // setTodoItems([
    //   ...todoItems,
    //   { itemName: name, itemStatus: false, id: generateUniqueID() },
    // ]);
    const id = generateUniqueID();
    const newDocRef = doc(db, `${TODO_ITEMS_PATH}/${id}`);
    setDoc(newDocRef, {
      itemName: name,
      itemStatus: false,
      id,
    });
    setIsAddClicked(false);
    setNewItemNameInput("");
  };

  const handleToggleShowCompleted = () => {
    setIsCompletedShown((prevState) => !prevState);
  };

  const handleDeleteCompleted = async () => {
    // const newData = todoItems.filter((item) => item.itemStatus === false);
    // setTodoItems(newData);

    // create a query with the required conditions
    const completedItemsQuery = query(
      collection(db, TODO_ITEMS_PATH),
      where("itemStatus", "==", true)
    );

    // get a snapshot of all matching docs
    const querySnapshot = await getDocs(completedItemsQuery);

    // console.log(querySnapshot);
    // perform delete on each one
    querySnapshot.forEach((task) => {
      const delDocRef = doc(db, `${TODO_ITEMS_PATH}/${task.id}`);
      deleteDoc(delDocRef);
      console.log(task.id, "=>", task.data());
    });
  };

  return (
    <>
      <div className="app-container">
        {loading ? (
          "Loading, Please wait..."
        ) : (
          <TodoList
            data={todoItems}
            onItemChange={handleItemChange}
            onItemAdd={handleItemAdd}
            isCompletedShown={isCompletedShown}
          />
        )}
        {isAddClicked === true ? (
          <div>
            <input
              type="text"
              name="new-item"
              id="new-item"
              value={newItemNameInput}
              onChange={(e) => setNewItemNameInput(e.target.value)}
            />
            <input
              type="number"
              min="0"
              max="3"
              name="priority"
              id="priority"
              value={priorityInput}
              onChange={(e) => setPriorityInput(e.target.value)}
            />
            <button onClick={() => handleItemAdd(newItemNameInput)}>Add</button>
          </div>
        ) : (
          <div className="add-button" onClick={() => setIsAddClicked(true)}>
            Add A Task
          </div>
        )}
        <MenuPopupState
          isCompletedShown={isCompletedShown}
          onToggleShowCompleted={handleToggleShowCompleted}
          onDeleteCompleted={handleDeleteCompleted}
        />
      </div>
    </>
  );
};

export default App;
