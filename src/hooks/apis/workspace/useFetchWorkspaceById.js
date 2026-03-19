const { fetchWorkspaceDetailsRequest } = require("@/apis/workspace")
const { useAuth } = require("@/hooks/context/useAuth")
const { useQuery } = require("@tanstack/react-query")

export const useFetchWorkspaceById = () => {

    const { auth } = useAuth();

    const { isFetching, isSuccess, error, data: workspace,  } = useQuery({
        queryFn: (id) => fetchWorkspaceDetailsRequest({ workspaceId: id , token: auth?.token}),
        queryKey: [`fetWorkspaceById-${id}`],
        staleTime: 10000
    })

    return { 
        isFetching, 
        isSuccess, 
        error, workspace 
    }
}