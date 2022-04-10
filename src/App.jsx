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
import Select from "react-select";

import { db } from "./firebase.jsx";

// const INITIAL_DATA = [
//   {
//     itemName: "default item",
//     isCompleted: false,
//     id: generateUniqueID(),
//   },
//   {
//     itemName: "another item",
//     isCompleted: false,
//     id: generateUniqueID(),
//   },
//   {
//     itemName: "and another item",
//     isCompleted: true,
//     id: generateUniqueID(),
//   },
// ];
const listsRef = collection(db, "/lists/"); // path to the root directory in Firebase
// const querySnapshot = getDocs(listsRef);
// querySnapshot.forEach((doc) => {
//   options.push(doc.data().listName);
// });
// const defaultListId = generateUniqueID();

const App = () => {
  // const [todoItems, setTodoItems] = useState(INITIAL_DATA);
  const [listId, setListId] = useState("defaultlist1234");
  const [listName, setListName] = useState("Default");
  const TODO_ITEMS_PATH = `/lists/${listId}/tasks`;
  const todoItemsRef = collection(db, `/lists/${listId}/tasks`); // ref to tasks changes with listId and gets passed to child component TodoList
  const [lists] = useCollectionData(listsRef);
  // map lists to values and labels
  // options is what appears in the dropdown menu
  const options = lists
    ? lists.map((l) => {
        return { value: l.listId, label: l.listName };
      })
    : [];
  console.log(options);

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

  const handleListNameChange = (id, newName) => {
    const changedListRef = doc(db, `/lists/${id}`);
    updateDoc(changedListRef, {
      listName: newName,
    });
  };

  const handleItemAdd = (name) => {
    // setTodoItems([
    //   ...todoItems,
    //   { itemName: name, isCompleted: false, id: generateUniqueID() },
    // ]);
    const id = generateUniqueID();
    const newDocRef = doc(db, `${TODO_ITEMS_PATH}/${id}`);
    setDoc(newDocRef, {
      itemName: name,
      isCompleted: false,
      id,
    });
    setIsAddClicked(false);
    setNewItemNameInput("");
  };

  const handleToggleShowCompleted = () => {
    setIsCompletedShown((prevState) => !prevState);
  };

  const handleDeleteCompleted = async () => {
    // const newData = todoItems.filter((item) => item.isCompleted === false);
    // setTodoItems(newData);

    // create a query with the required conditions
    const completedItemsQuery = query(
      collection(db, TODO_ITEMS_PATH),
      where("isCompleted", "==", true)
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

  const handleAddList = () => {
    const newListId = generateUniqueID();
    const newListRef = doc(db, `lists/${newListId}`);
    setDoc(newListRef, {
      listName: "New List",
      listId: newListId,
    });
  };

  return (
    <>
      <div className="app-container">
        <Select
          defaultValue={listId}
          onChange={(selectedList) => {
            setListId(selectedList.value);
            setListName(selectedList.label);
          }}
          options={options}
        />

        <TodoList
          onItemChange={handleItemChange}
          onItemAdd={handleItemAdd}
          isCompletedShown={isCompletedShown}
          listName={listName}
          listId={listId}
          onListNameChange={handleListNameChange}
          todoItemsRef={todoItemsRef}
        />

        {isAddClicked ? (
          <div className="add-item-input-form">
            <label htmlFor="new-item">Task Name: </label>
            <input
              type="text"
              name="new-item"
              id="new-item"
              value={newItemNameInput}
              onChange={(e) => setNewItemNameInput(e.target.value)}
            />
            <label htmlFor="priority">Task Priority: (0-3)</label>
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
          onAddList={handleAddList}
        />
      </div>
    </>
  );
};

export default App;
