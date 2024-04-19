import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import GetUser from '../hooks/GetUser';
import { ChatboxReciever, ChatboxSender } from './Chatbox/Chatbox';
import InputText from './InputText';
import Login from './Login/Login';

function ChatContainer() {
    const socketio = socketIOClient("http://localhost:3000");
    const [chats, setChats] = useState([]);
    const [user] = GetUser();
    const [avatar] = useState("https://3978159.fs1.hubspotusercontent-na1.net/hubfs/3978159/");

    useEffect(() => {
        socketio.on('chat', senderChats => {
            setChats(senderChats);
        });
        // Clean up function to unsubscribe from the socket event
        return () => {
            socketio.off('chat');
        };
    }, []); // Added an empty dependency array to run the effect only once

    function sendChatToSocket(chat) {
        socketio.emit('chat', chat);
    }

    function addMessage(chat) {
        const newChat = { ...chat, user, avatar };
        setChats(prevChats => [...prevChats, newChat]);
        sendChatToSocket(newChat);
    }

    function renderChatList() {
        return chats.map((chat, index) => {
            return (
                chat.user == user ? (
                    <ChatboxSender key={index} message={chat.message} avatar={chat.avatar} />
                ) : (
                    <ChatboxReciever key={index} message={chat.message} avatar={chat.avatar} />
                )
            );
        });
    }

    return (
        <div>
            {user ? (
                <div>
                    <h4>UserName: {user}</h4>
                    {renderChatList()}
                    <InputText addMessage={addMessage} />
                </div>
            ) : (
                <Login></Login>
            )}
        </div>
    );
}

export default ChatContainer;
