import React, { useState } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import TodoList from './TodoList';
import MenuPopupState from './Menu';

const INITIAL_DATA = [
  {
    itemName: 'default item',
    itemStatus: false,
    id: generateUniqueID()
  },
  {
    itemName: 'another item',
    itemStatus: false,
    id: generateUniqueID()
  },
  {
    itemName: 'and another item',
    itemStatus: true,
    id: generateUniqueID()
  }
];

const App = () => {
  // TO ASK should this be in app or todolist
  // here, todoitems update -> whole list rerender?
  // in todolist, only updated items rerender?
  const [todoItems, setTodoItems] = useState(INITIAL_DATA);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [newItemNameInput, setNewItemNameInput] = useState('');
  const [isCompletedShown, setIsCompletedShown] = useState(true);

  const handleItemChange = (id, field, value) => {
    const newTodoItems = todoItems.map((item) => {
      return item.id === id ? { ...item, [field]: value } : item;
    });
    setTodoItems(newTodoItems);
  };

  const handleItemAdd = (name) => {
    setTodoItems([...todoItems, { itemName: name, itemStatus: false, id: generateUniqueID() }]);
    setIsAddClicked(false);
    setNewItemNameInput('');
  };

  const handleToggleShowCompleted = () => {
    setIsCompletedShown((prevState) => !prevState);
  };

  const handleDeleteCompleted = () => {
    const newData = todoItems.filter((item) => item.itemStatus === false);
    setTodoItems(newData);
  };

  return (
    <>
      <div className="app-container">
        <TodoList
          data={todoItems}
          onItemChange={handleItemChange}
          onItemAdd={handleItemAdd}
          isCompletedShown={isCompletedShown}
        />
        {isAddClicked === true ? (
          <div>
            <input
              type="text"
              name="new-item"
              id="new-item"
              value={newItemNameInput}
              onChange={(e) => setNewItemNameInput(e.target.value)}
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
