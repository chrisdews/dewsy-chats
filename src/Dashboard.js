import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import io from "socket.io-client";

// import { CTX } from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "65%"
  },
  nameBox:{
      width: "20%",
     minWidth: "100px"

  },
  button: {
    width: "15%"
  }
}));

const initState = {
  general: [
    { from: "dewsy", msg: "welcome" },
    { from: "donald", msg: "drink bleach" }
  ],
  topic2: [{ from: "obi", msg: "hello there" }]
};

const Dashboard = () => {
  const [allChats, updateAllChats] = useState(initState);

  let socket = io(":3001");
  useEffect(() => {
    socket.on("chat message", ({ topic, msg, from }) => {
      // console.log(data)
      //   addNewChat(data);
      updateAllChats({
        ...allChats,
        [topic]: [...allChats[topic], { msg, from }]
      });
    });
    return () => {
      socket.off("chat message");
    };
  }, [allChats]);

  const classes = useStyles();

  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, changeTextValue] = useState("");
  const [nameTextValue, changeNameTextValue] = useState("");

  const sendChatAction = value => {
    // let socket = io(":3001");
    socket.emit("chat message", value);
  };

  const clickHandler = () => {
    sendChatAction({ msg: textValue, from: nameTextValue, topic: activeTopic });
    changeTextValue("");
  };

  const randNum = Math.random(100) * 100;
  const user = "new_user_" + randNum.toFixed(0);

  const helperText = nameTextValue ? 'smells terrible' : 'this is very important'


  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h3">
          DEWSY chat
        </Typography>
        <Typography component="p">{activeTopic}</Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List component="nav" aria-label="main mailbox folders">
              {topics.map(topic => (
                <ListItem
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={topic}></ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <>
                <div className={classes.flex}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography component="p" gutterBottom>
                    {chat.msg}
                  </Typography>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className={classes.flex}>
          <TextField
            id="outlined-basic"
            label="What's your name?"
            variant="outlined"
            className={classes.nameBox}
            value={nameTextValue}
            onChange={e => changeNameTextValue(e.target.value)}
            helperText={helperText}
          />
          <TextField
            id="standard-name"
            label="Send a message..."
            className={classes.chatBox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={clickHandler}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
