import React, { useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, signOut } from "firebase/auth";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
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
const auth = getAuth();

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  if (user == null) {
    return <SignIn />;
  }
  return <SignedInApp user={user} />;
};

const SignIn = () => {
  return (
    <>
      <div className="app-container">
        <div className="sign-in-methods">
          <SignInWithGoogle />
          <div>OR</div>
          <SignInWithEmail />
          <div>OR</div>
          <SignUpWithEmail />
        </div>
      </div>
    </>
  );
};

const SignInWithGoogle = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      <button onClick={() => signInWithGoogle()}>Sign In With Google</button>
    </>
  );
};

const SignInWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  return (
    <>
      <div className="email-signin">
        <input
          type="text"
          name="Email"
          id="email"
          value={email}
          placeholder={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="Password"
          id="email"
          value={password}
          placeholder={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={() => signInWithEmailAndPassword(email, password)}>
          Sign In With Email
        </button>
      </div>
    </>
  );
};

const SignUpWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  return (
    <>
      <input
        type="text"
        name="Email"
        id="email"
        value={email}
        placeholder={"Email"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="Password"
        id="password"
        value={password}
        placeholder={"Create a password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>
        Create Account
      </button>
    </>
  );
};

const SignedInApp = ({ user }) => {
  //TODO
  // console.log(user);
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

  const [isAddClicked, setIsAddClicked] = useState(false);
  const [newItemNameInput, setNewItemNameInput] = useState("");
  const [isCompletedShown, setIsCompletedShown] = useState(true);
  const [priorityInput, setPriorityInput] = useState(0);
  const handleItemChange = (id, field, value) => {
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
    setListName(newName);
  };

  const handleItemAdd = (name) => {
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
    // create a query with the required conditions
    const completedItemsQuery = query(
      collection(db, TODO_ITEMS_PATH),
      where("isCompleted", "==", true)
    );

    // get a snapshot of all matching docs
    const querySnapshot = await getDocs(completedItemsQuery);

    // perform delete on each one
    querySnapshot.forEach((task) => {
      const delDocRef = doc(db, `${TODO_ITEMS_PATH}/${task.id}`);
      deleteDoc(delDocRef);
    });
  };

  const handleDeleteList = async () => {
    // Delete the entire subcollection of tasks
    const querySnapshot = await getDocs(todoItemsRef);
    querySnapshot.forEach((task) => {
      const delDocRef = doc(db, `${TODO_ITEMS_PATH}/${task.id}`);
      deleteDoc(delDocRef);
    });

    // Delete the list itself
    const delListRef = doc(db, `/lists/${listId}`);
    deleteDoc(delListRef);
  };

  const handleAddList = () => {
    const newListId = generateUniqueID();
    const newListRef = doc(db, `lists/${newListId}`);
    setDoc(newListRef, {
      listName: "New List",
      listId: newListId,
      ownerId: user.uid,
    });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <div className="app-container">
        <p>
          You are signed in as{" "}
          <span className="user-display-name">{user.displayName}</span>.
        </p>
        <Select
          className="select-list-button"
          aria-label={"List Selection"}
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
          <div
            className="add-button"
            onKeyPress={() => setIsAddClicked(true)}
            onClick={() => setIsAddClicked(true)}
            tabindex="0"
          >
            Add A Task
          </div>
        )}
        <MenuPopupState
          isCompletedShown={isCompletedShown}
          onToggleShowCompleted={handleToggleShowCompleted}
          onDeleteCompleted={handleDeleteCompleted}
          onAddList={handleAddList}
          onSignOut={handleSignOut}
          onDeleteList={handleDeleteList}
        />
      </div>
    </>
  );
};

export default App;
