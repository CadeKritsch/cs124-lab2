import React, { useState } from "react";
import Popup from "reactjs-popup";

export const Modal = (props) => {
  const [sharedUserEmail, setSharedUserEmail] = useState("");
  return (
    <Popup trigger={<button className="button"> Share... </button>} modal>
      <div>
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
        <button
          onClick={() => props.onShareList(props.listId, sharedUserEmail)}
        >
          Share List
        </button>
      </div>
    </Popup>
  );
};
