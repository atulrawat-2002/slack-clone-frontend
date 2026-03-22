import { fetchWorkspaceDetailsRequest }  from "@/apis/workspace"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from  "@tanstack/react-query"

export const useFetchWorkspaceById = (id) => {
    const { auth } = useAuth();

    const { isFetching, isSuccess, error, data: workspace,  } = useQuery({
        queryFn: () => fetchWorkspaceDetailsRequest({ workspaceId: id , token: auth?.token}),
        queryKey: [`fetWorkspaceById-${id}`],
        staleTime: 10000
    })

    return { 
        isFetching, 
        isSuccess, 
        error, 
        workspace 
    }
}