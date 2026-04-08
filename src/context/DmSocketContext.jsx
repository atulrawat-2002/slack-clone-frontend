import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const DmSocketContext = createContext();

export function DmSocketContextProvider({ children }) {

    const [dmMessages, setDmMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const conversationIdref = useRef(null);
    const socketRef = useRef(null);

   const [dmSocket, setDmSocket] = useState(null); // ✅ add this

    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_BACKEND_SOCKET_URL}/dm`);
        socketRef.current = socket;
        setDmSocket(socket); // ✅ add this

        socket.on('newDm', (data) => {
            setDmMessages(prev => [...prev, data]);
        });

        return () => {
            socket.off('newDm');
            socket.disconnect();
        };
    }, []);

    async function createConversation({ senderId, recieverId }) {
        socketRef.current?.emit('createConversation', { senderId, recieverId }, (data) => {
            console.log('setting conversation id', data?.id);
            setConversationId(data?.id);
            conversationIdref.current = data?.id; // ✅ ref stays in sync
        });
    }

    // ✅ override setConversationId to also keep the ref in sync when cleared
    function resetConversation() {
        setConversationId(null);
        conversationIdref.current = null;
    }

    return (
        <DmSocketContext.Provider value={{
            dmSocket,
            createConversation,
            conversationIdref,
            conversationId,
            setConversationId: resetConversation, // ✅ exposes reset that clears both state and ref
            dmMessages,
            setDmMessages  // ✅ exposed so Dm.jsx can clear on partner switch
        }}>
            {children}
        </DmSocketContext.Provider>
    );
}

export default DmSocketContext;