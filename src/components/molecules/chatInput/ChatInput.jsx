import { Editor } from "@/components/atoms/Editor/Editor";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";

export const ChatInput = () => {

    const { socket, currentChannel } = useSocket();
    const {auth} = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();

    function handlesubmit({body}) {
        console.log('sending the message', body)
        socket.emit('newMessage', {
            channelId: currentChannel,
            body, 
            senderId: auth?.user?._id,
            workSpaceId: currentWorkspace?._id
        }, (data) => {
            console.log('Message sent', data)
        })
    }

    return (
        <div
            className="px-5 w-full"
        >
            <Editor
                placeholder="Type a message..."
                onSubmit={handlesubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
                
            />

        </div>
    );
};