import { getAllExistingWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const userGetAllExistingWorkspaces = () => {

    const { auth } = useAuth();

    const { isFetching, isSuccess , isError, data: allExistingWorkspaces, refetch: getAllworkspaceFetch } = useQuery({
        queryFn: () => {
            return getAllExistingWorkspaceRequest(auth?.token)
        },
        queryKey: ['allExistingWorkspaces'],
        enabled: false
    })

    return {
        isFetching,
        isError,
        allExistingWorkspaces,
        isSuccess,
        getAllworkspaceFetch
    }

}