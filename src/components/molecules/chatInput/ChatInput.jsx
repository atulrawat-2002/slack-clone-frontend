import { Editor } from "@/components/atoms/Editor/Editor";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";

export const ChatInput = ({dm}) => {

    const { socket, currentChannel } = useSocket();
    const {auth} = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();

    return (
        <div
            className="px-5 w-full"
        >
            <Editor
                placeholder="Type a message..."
                onSubmit={() => {}}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
                dm={dm}
            />

        </div>
    );
};