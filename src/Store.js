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

const reducer = (allChats, action) => {
  console.log("action.payload", action.payload);
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...allChats,
        [topic]: [...allChats[topic], { from, msg }]
      };
    default:
      return allChats;
  }
};

let socket;

const sendChatAction = value => {
//   console.log("value from sendChatAction - store", value);
//   if (!socket) {
    socket = io(":3001");
    socket.emit("chat message", value);
    // socket.emit('end');
    // socket.disconnect()
//   }

  // io.on('chat message', (value) => {
  //     io.emit('chat message', value);
  //   });
};

const Store = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  let socket;
  const [chat, updateChat] = React.useState(0);
  React.useEffect(() => {
      if (!socket) {
        socket = io(":3001");
        socket.on("chat message", (msg) => {
        //   console.log("on message ----", msg);
          dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
        //   console.log('dispatch was called')
        });
    
      }
      
  }, [allChats]);





  const randNum = Math.random(100) * 100;
  const user = "new_user_" + randNum.toFixed(0);
  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
