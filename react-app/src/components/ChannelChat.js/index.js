import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import DeleteChatModal from './modals/DeleteChatModal';
import EditChatModal from './modals/EditChatModal';
import * as channelMessagesReducer from '../../store/channelMessages';

let socket;

const ChannelChat = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId]);
    const channelMessages = useSelector((state) => Object.values(state.channelMessages));
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState(channelMessages);
    // console.log('--------messages: ', messages, '------------')
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
		const errors = [];

		if (!content) errors.push("A message is required.");
        if (content.length > 255) errors.push("The message must be less than 250 characters long.")

		setValidationErrors(errors);
	}, [content]);


    useEffect(() => {
        
        // open socket connection
        // create websocket
        socket = io();

        // listen for chat events
        socket.on("chat", async(res) => {
            // when we recieve a chat, add it into our messages array in state
            await dispatch(channelMessagesReducer.actionAddEditMessage(res));
            const response = await dispatch(channelMessagesReducer.thunkGetMessages(channelId))
            setMessages(response);
        })

        socket.on("delete", async (res) => {
            await dispatch(channelMessagesReducer.actionDeleteMessage(res));
            const response = await dispatch(channelMessagesReducer.thunkGetMessages(channelId))
            setMessages(response);
          });

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch, channelId])

    useEffect(() => {
        (async() => {
            if (currentUser) {
                const res = await dispatch(channelMessagesReducer.thunkGetMessages(channelId));
                // console.log('----------res: ', res, '----------');
                setMessages(res);
            }
        })()
    }, [dispatch, channelId, content, currentUser]);

    const sendChat = async(e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (!validationErrors.length) {
            const res = await dispatch(channelMessagesReducer.thunkAddMessage(content, channelId));
            if (res) {
                socket.emit("chat", res)
                setMessages(channelMessages);
                setContent("")
            };
        };
    };

    if (!currentUser) return <Redirect to="/login" />;

    return ((currentUser && channel) ? (
        <div>
            { messages && <div>
                {messages.map((message, ind) => (
                    <div key={ind}>
                        <div>{`${message.user.nickname ? message.user.nickname : message.user.full_name}: ${message.message} (${message.created_at})`}</div>
                        {(message.user.id === currentUser.id) && <DeleteChatModal message={message} socket={socket} />}
                        {(message.user.id === currentUser.id) && <EditChatModal message={message} socket={socket} />}
                    </div>
                ))}
            </div> }
            <form onSubmit={sendChat}>
                <input
                    value={content}
                    placeholder={`Message #${channel.title}`}
                    onChange={(e) => setContent(e.target.value)}
                />
                {(255 > content.length && content.length > 0) && <button type="submit">Send</button>}
            </form>
        </div>
    ) : <div></div>);
};

export default ChannelChat;