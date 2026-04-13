// useGetPaginatedDms.js
import axiosConfig from '@/configs/axiosConfig';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // or your existing api client

export const useGetPaginatedDms = (conversationId) => {
    const { auth } = useAuth();
    const { data, isSuccess, isFetching } = useQuery({
        queryKey: ['getPaginatedDms', conversationId],
        queryFn: async () => {
            const response = await axiosConfig.get(
                `/messages/dms/${conversationId}?page=1&limit=20`,
                {
                    headers: {
                        'x-access-token': auth?.token
                    }
                }
            );
            return response.data;
        },
        enabled: !!conversationId, // ✅ only runs when conversationId exists
    });

    return {
        oldMessages: data?.data,
        isSuccess,
        isFetching
    };
};