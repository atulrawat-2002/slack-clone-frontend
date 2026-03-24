import { fetchWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

    
export const userFetchWorkspace = () => {

    const { auth } = useAuth();

    const { isFetching, isSuccess, isError, data: workSpaces } = useQuery({
        queryFn: () => fetchWorkspaceRequest({token: auth?.token}),
        queryKey: ['fetchWorkspace'],
        staleTime: 30000
    })

    return {
        isFetching,
        isSuccess,
        isError,
        workSpaces
    }

}