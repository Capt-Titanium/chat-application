import React ,{ useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from './textcontainer';
import Messages from './messages';
import InfoBar from './infobar';
import Input from './input';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "http://localhost:5000";

    useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT,location.search]);

    useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

var connectionOptions = {
    "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
};

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

    return (
        <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
    );
}

export default Chat;