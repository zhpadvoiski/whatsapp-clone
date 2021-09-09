import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile } from "@material-ui/icons";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./chat.css";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  //Show messages based on the room
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  //Depends on our roomId , change the room
  useEffect(() => {
    if (roomId) {
      //inside the rooms, going to the specific doc, which in specific room and use that roomId
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          //when gat a snapchat, use that room name
          setRoomName(snapshot.data().name); //it will get inside and pull that data
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
      //it will get inside and pull that data from db
    }
  }, [roomId]);

  /* Random user*/
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]); //everytime when roomId changes

  const sendMessage = (e) => {
    e.preventDefault(); /* stop from refreshing  */
    /* Add messages to db */
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName /* from google autentificacion nuser.displayName */,
      timestamp:
        firebase.firestore.FieldValue.serverTimestamp() /* time from the server */,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen {/* from last message */}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, idx) => (
          <p
            key={idx}
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            {/* messages will appear depends on user name on data */}
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}{" "}
              {/* SHOW REAL */}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
