import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import db from '../firebase';
import './sidebarChat.css';

function SidebarChat( {addNewChat, name, id}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    /* show last message on sideBar */
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    /* Random user */
    useEffect(()=>{
        setSeed(Math.floor(Math.random()* 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt('Please enter name for chat room');

        if(roomName){
            //push information to database
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
            {/* Api for random user avatar */}
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2> {/* from data base */}
                <p>{messages[0]?.message}</p>{/* desendeing */}
            </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;
