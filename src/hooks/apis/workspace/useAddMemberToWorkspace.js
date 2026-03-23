import { addMemberToWorkspaceRequest } from "@/apis/workspace"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useAddMemberToWorkspace = ( {workspaceId} ) => {

    const { auth } = useAuth();

    const { mutateAsync: addMemberToWorkspaceMutation, isSuccess, isPending, error } = useMutation({
        mutationFn: () => addMemberToWorkspaceRequest({ workspaceId, token: auth?.token }),
        onSuccess: (data) => {
            console.log("data in add member to workspace hook", data);
        },
        onError: (error) => {
            console.log('Error in add member to workspace hook', error.message);
        }
    })

    return {
        addMemberToWorkspaceMutation,
        isSuccess,
        isPending,
        error
    }

}