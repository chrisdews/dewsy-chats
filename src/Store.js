import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
  general: [
    { from: "dewsy", msg: "welcome" },
    { from: "donald", msg: "drink bleach" }
  ],
  topic2: [{ from: "obi", msg: "hello there" }]
};

const reducer = (state, action) => {
  console.log(action.payload);
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
};

let socket;

const sendChatAction = (value) => {
  socket.emit("chat message", value);
};

const Store = props => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", msg => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }
  const randNum = Math.random(100) * 100;
  const user = "new_user_" + randNum.toFixed(0);
  return (
    <CTX.Provider value={{ state, sendChatAction, user }}>
    {console.log(state)}
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
