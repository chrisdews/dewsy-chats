import React from "react";
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
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [textValue, changeTextValue] = React.useState('')

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h3">
          DEWSY chat
        </Typography>
        <Typography component="p">topic placeholder</Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List component="nav" aria-label="main mailbox folders">
              {["a topic"].map(topic => (
                <ListItem key={topic} button>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={topic}></ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {[{ user: "chris user", msg: "hello there" }].map((chat, i) => (
              <div className={classes.flex}>
                <Chip label={chat.user} className={classes.chip} />
                <Typography component="p">{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.flex}>
          <TextField
            id="standard-name"
            label="Send a message..."
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => changeTextValue(e.target.value)}

          />

          <Button variant="contained" color="primary" className={classes.button}>
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
