import { joinWorkspaceRqquest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query"

export const useJoinWorkspace = (workspaceId) => {

    const { auth } = useAuth();

    const { mutateAsync: joinWorkspceMutation, isPending, isSuccess, error } = useMutation({
        mutationFn: (joinCode) => joinWorkspaceRqquest({workspaceId, joinCode, token: auth?.token}),
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.log('Error in join workspce hook', error.message)
        }
    })

    return {
        joinWorkspceMutation,
        isSuccess,
        isPending,
        error
    }

}