import { addChannelToWorkspaceRequest } from "@/apis/workspace"
import  { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useAddChannelToWorkspace = () => {

    const { auth } = useAuth();

    const { mutateAsync: addChannelToWorkspaceMutation, isSuccess, isPending, error } = useMutation({
        mutationFn: ({ workspaceId, channelName }) => addChannelToWorkspaceRequest({ workspaceId, channelName, token: auth?.token }),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log('Error in useAddChannelToWorkspace hook', error.message)
        }
    })

    return {
        addChannelToWorkspaceMutation,
        isPending,
        isSuccess,
        error
    }
}