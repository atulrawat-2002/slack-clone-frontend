import { ChatInput } from "@/components/molecules/chatInput/ChatInput";
import { Message } from "@/components/molecules/message/Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetPaginatedDms } from "@/hooks/apis/dms/useGetPaginatedDms";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useDmSocket } from "@/hooks/context/useDmSocket";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
export const Dm = () => {

  const { dmSocket, createConversation, conversationId, setConversationId, dmMessages, setDmMessages } = useDmSocket();
  const { userId: recieverId } = useParams();
  const { auth } = useAuth();
  const [friend, setFriend] = useState(null);
  const dmListRef = useRef(null);
  const { currentWorkspace } = useCurrentWorkspace();

  const { oldMessages, isSuccess } = useGetPaginatedDms(conversationId); // ✅ driven by conversationId

  // reset and create conversation when partner changes
  useEffect(() => {
    setDmMessages([]);
    setConversationId(null);
    createConversation({ senderId: auth?.user?._id, recieverId });
  }, [recieverId, auth?.user?._id]);

  // ✅ once conversationId is ready and old messages are fetched, prepend them
  useEffect(() => {
    if (isSuccess && oldMessages) {
      setDmMessages(prev => {
        const existingIds = new Set(prev.map(m => m._id));
        const fresh = [...oldMessages].reverse().filter(m => !existingIds.has(m._id));
        return [...fresh, ...prev];
      });
    }
  }, [isSuccess, oldMessages]);

  useEffect(() => {
    if (!currentWorkspace) return;
    const result = currentWorkspace?.members?.find(
      (member) => member?.memberId?._id === recieverId
    );
    setFriend(result?.memberId);
  }, [currentWorkspace, recieverId]);

  useEffect(() => {
    if (dmListRef.current) {
      dmListRef.current.scrollTop = dmListRef.current.scrollHeight;
    }
  }, [dmMessages]);

  // rest of JSX stays the same

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-amber-50 shadow-md border-b h-[50px] flex items-center px-4 overflow-hidden shrink-0">
          {friend?.username}
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={friend?.avatar}
              className="rounded-md object-cover"
            />
            <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
              {friend?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div ref={dmListRef} className=" overflow-y-auto p-5 gap-y-2">
          {dmMessages?.map((message) => {
            return (
              <Message
                key={message?._id}
                body={message?.body}
                authorImage={message?.senderId?.avatar}
                authorName={message?.senderId?.username}
                createdAt={message?.createdAt}
                image={message?.image}
              />
            );
          })}
        </div>

        <div className="flex-1 " />

        <ChatInput dm={true} />
      </div>
    </>
  );
};
