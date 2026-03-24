import { getChannelByIdrequest } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelById = (channelId) => {

    const { auth } = useAuth();

    const { isFetching, isError, data: channelDetails, error } = useQuery({
        queryFn: () => getChannelByIdrequest({ channelId, token: auth?.token }),
        queryKey: [`get-channel-${channelId}`],
        staleTime: 30000
    });

    return {
        isFetching,
        isError,
        channelDetails,
        error,
    };

};