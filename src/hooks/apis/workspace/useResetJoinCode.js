import { resetWorkspaceJoinCodeRequest } from "@/apis/workspace"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useResetJoinCode = ( workspaceId ) => {

    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const { mutateAsync: resetJoinCodeMutation, isPending, isSuccess, error } = useMutation({
        mutationFn: () => resetWorkspaceJoinCodeRequest({ workspaceId, token: auth?.token }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
            queryKey: [`fetWorkspaceById-${workspaceId}`]
        });
        },
        onError: (error) => {
            console.log('use reset join code hook error', error.message);
        }
    })

    return {
        resetJoinCodeMutation,
        isSuccess,
        isPending,
        error
    }
}