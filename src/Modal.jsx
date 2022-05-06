import React, { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";

import "./app.css";

export const Modal = (props) => {
  const [sharedUserEmail, setSharedUserEmail] = useState("");
  const [isShareClicked, setIsShareClicked] = useState(false);
  const timerRef = useRef(null);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Popup trigger={<button className="button"> Share... </button>} modal>
      <div className="share-list-form">
        <label htmlFor="shared-user"></label>
        <input
          type="text"
          name="shared-user"
          id="shared-user"
          placeholder="Enter an email"
          onChange={(e) => {
            setSharedUserEmail(e.target.value);
          }}
        />

        {!isShareClicked ? (
          <button
            onClick={() => {
              if (validateEmail(sharedUserEmail)) {
                props.onShareList(props.listId, sharedUserEmail);
                setIsShareClicked(true);
                // delay and then reset boolean
                timerRef.current = setTimeout(() => {
                  setIsShareClicked(false);
                }, 2000);
              }
            }}
          >
            Share List
          </button>
        ) : (
          <div className="share-success-msg">Shared Successfully</div>
        )}
      </div>
    </Popup>
  );
};
