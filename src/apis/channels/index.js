import axiosConfig from "@/configs/axiosConfig"

export const getChannelByIdrequest = async ({ channelId, token }) => {

    try {
        
        const response = await axiosConfig.get(`/channel/${channelId}`, {
            headers: {
                'x-access-token': token
            }
        });

        return response;

    } catch (error) {
        console.log('Error in get channel by id request', error.message);
        throw error
    }
}

export const getPaginatedMessagesRequest = async ({ channelId, workSpaceId, limit, page, token }) => {
    try { 
        
        const response = await axiosConfig.get(`/messages/${channelId}/${workSpaceId}`, {
            params: {
                limit: limit || 20,
                page: page || 1
            },
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;

    } catch (error) {
        console.log('Error in get channel by id request', error.message);
        throw error
    }
}