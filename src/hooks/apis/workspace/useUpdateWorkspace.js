import {  updateWorkspaceRequest } from "@/apis/workspace"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useUpdateWorkspace = (workspaceId) => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: updateWorkspaceMutation } = useMutation({
        mutationFn: (name) => {
            return updateWorkspaceRequest({ workspaceId, name, token: auth?.token })
        },
        onSuccess: () => {
            console.log("Workspace updaated successfullt")
        },
        onError: (err) => {
            console.log("error in useupdateworkspace", err)
        }
    })

    return {
        isPending,
        isSuccess,
        error, 
        updateWorkspaceMutation
    }
}