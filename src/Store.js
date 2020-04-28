import React from "react";

export const CTX = React.createContext();

const initState = {
  general: [
    { from: "dewsy", msg: "welcome" },
    { from: "donald", msg: "drink bleach" }
  ],
  topic2: [{ from: "obi", msg: "hello there" }]
};

const reducer = (state, action) => {
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

const Store = props => {
  const reducerHook = React.useReducer(reducer, initState);
  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
};

export default Store;
