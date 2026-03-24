import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { useGetChannelById } from '@/hooks/apis/channel/useGetChannelById';
import { useSocket } from '@/hooks/context/useSocket';
import { useEffect, useRef } from 'react';
import { useGetPaginatedMessage } from '@/hooks/apis/channel/useGetPaginatedMessages';
import { Message } from '@/components/molecules/message/Message';
import { useChannelMessages } from '@/hooks/apis/channel/useChannleMessages';
import { useQueryClient } from '@tanstack/react-query';

export const Channel = () => {

    const { channelId, workspaceId } = useParams();

    const { channelDetails, isFetching, isError } = useGetChannelById(channelId);

    const { joinChannel } = useSocket();
    const queryClient = useQueryClient();

    const { messages, isSuccess } = useGetPaginatedMessage(channelId, workspaceId);
    const { messageList, setMessageList } = useChannelMessages();
    const messageListRef = useRef(null);

    useEffect(() => {
        if(messageListRef.current) {
            console.log("before", messageListRef.current.scrollTop)
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            console.log("after", messageListRef.current.scrollTop)
        }
    }, [messageList])

    useEffect(() => {
        console.log('ChannelId', channelId);
        queryClient.invalidateQueries('getPaginatedMessages');
    }, [channelId]);

    useEffect(() => {
        if(!isFetching && !isError) {
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId])

    useEffect(() => {
        if(isSuccess ) {
            console.log('Channel Messages fetched');
            setMessageList(messages);
        }
    }, [isSuccess, messages, setMessageList, channelId]);

    if(isFetching) {
        return (
            <div
                className='h-full flex-1 flex items-center justify-center'
            >
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        );
    }



    return (
        <div className='flex flex-col h-full'>

            <ChannelHeader name={channelDetails?.name} />

            <div 
            ref={messageListRef}
            className="flex-5 overflow-y-auto p-5 gap-y-2"
            >
                 {messageList?.reverse().map((message) => {
                return <Message key={message._id} body={message.body} authorImage={message.senderId?.avatar} authorName={message.senderId?.username} createdAt={message.createdAt} image={message?.image}  />;
            })} 
            </div>

            <div className='flex-1' />

            <ChatInput />
        
        </div>
    );
}