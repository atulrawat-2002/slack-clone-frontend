import { fetchWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";


export const userFetchWorkspace = () => {

    const { auth } = useAuth();

    const { isPending, isSuccess, isError, data: workSpaces } = useQuery({
        queryFn: () => fetchWorkspaceRequest({token: auth?.token}),
        queryKey: ['fetchWorkspace'],
        staleTime: 30000
    })

    return {
        isPending,
        isSuccess,
        isError,
        workSpaces
    }

}