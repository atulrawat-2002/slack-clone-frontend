import { createWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";


export const userCreateWorkspace = () => {

    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: createWorkspaceMutation } = useMutation({
        mutationFn: (data) => createWorkspaceRequest({ ...data, token: auth?.token }),
        onSuccess: (data) => {
            console.log('workspace created successfully', data);
        },
        onError: (err) => {
            console.log('Error, in useCreateWorkSpace', err);
        }
    })

    return {
        isPending,
        isSuccess,
        error,
        createWorkspaceMutation
    }

}