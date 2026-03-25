import { useChannelMessages } from "@/hooks/apis/channel/useChannleMessages";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();


export const SocketContexProvider = ({ children }) => {

    const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

    const [currentChannel, setCurrentChannel] = useState(null);
    const { messageList, setMessageList } = useChannelMessages();

     socket.on('newMessageReceived', (data) => {
        setMessageList([...messageList, data]);
    });


    async function joinChannel(channelId) {
        socket.emit('joinChannel', { channelId }, (data) => {
                        setCurrentChannel(data?.data)
        });
    }

    return <SocketContext.Provider value={{socket, joinChannel, currentChannel}} > 

        {children}

    </SocketContext.Provider>
}


export default SocketContext;