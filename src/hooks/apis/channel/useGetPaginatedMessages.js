import { getPaginatedMessagesRequest }  from "@/apis/channels";
import { useAuth }  from "@/hooks/context/useAuth";
import { useQuery }  from "@tanstack/react-query";

export const useGetPaginatedMessage = (channelId, workSpaceId) => {

    const { auth } = useAuth()

    const { isFetching, isSuccess, error, isError, data: messages } = useQuery({
        queryFn: () => {
            return getPaginatedMessagesRequest({ channelId, workSpaceId, token: auth?.token, limit: 10, page: 0 })
        },
        queryKey: ['getPaginatedMessages', channelId],
        cacheTime: 0
    })

    return {
        isFetching,
        error,
        messages,
        isError,
        isSuccess
    }
}