import { deleteWorkspaceRequest } from "@/apis/workspace"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useDeleteWorkspace = (workspaceId) => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({ workspaceId, token: auth?.token }),
        onSuccess: () => {
            console.log("Workspace deleted successfullt")
        },
        onError: (err) => {
            console.log("error in usedeleteworkspace", err)
        }
    })

    return {
        isPending,
        isSuccess,
        error, 
        deleteWorkspaceMutation
    }
}