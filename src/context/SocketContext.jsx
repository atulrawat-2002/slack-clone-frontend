import { useChannelMessages } from "@/hooks/apis/channel/useChannleMessages";
import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketContexProvider = ({ children }) => {

    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null); // ✅ state so consumers re-render when ready
    const [currentChannel, setCurrentChannel] = useState(null);
    const { setMessageList } = useChannelMessages();

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
        socketRef.current = newSocket;
        setSocket(newSocket); // ✅ triggers re-render so Editor gets the real socket

        newSocket.on('newMessageReceived', (data) => {
            setMessageList(prev => [...prev, data]);
        });

        return () => {
            newSocket.off('newMessageReceived');
            newSocket.disconnect();
        };
    }, []);

    async function joinChannel(channelId) {
    const sock = socketRef.current;
    if (!sock) return;

    if (sock.connected) {
        // already connected, emit immediately
        sock.emit('joinChannel', { channelId }, (data) => {
            console.log('join channel event', data);
            setCurrentChannel(data?.data);
        });
    } else {
        // wait for connection first, then emit
        sock.once('connect', () => {
            sock.emit('joinChannel', { channelId }, (data) => {
                console.log('join channel event', data);
                setCurrentChannel(data?.data);
            });
        });
    }
}

    return (
        <SocketContext.Provider value={{ socket, joinChannel, currentChannel }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;