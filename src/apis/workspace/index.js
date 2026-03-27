import axiosConfig from "@/configs/axiosConfig";

export const createWorkspaceRequest = async ({ name, description, token }) => {

    try {
        const response = await axiosConfig.post('/workspace/', {
            name,
            description
        }, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;

    } catch (error) {

        console.log('Error in create workspace requesr', error.message);
        throw error

    }

}


export const fetchWorkspaceRequest = async ({ token }) => {
    try {
        const response = await axiosConfig.get('/workspace', {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;

    } catch (error) {

        console.log('Error in fetch workspace request', error.message);
        throw error;

    }
} 


export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
    try {

        const response = await axiosConfig.get(`/workspace/get/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
        
    } catch (error) {
        console.log('Error in fetch workspace details request', error.message);
        throw error;
    }
}


export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
    try {
        
        const response = await axiosConfig.delete(`/workspace/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        })

        console.log(response?.data)
        return response?.data?.data;

    } catch (error) {
        console.log("Error in delete workspace request", error)
    }
}


export const updateWorkspaceRequest = async ({ workspaceId, name, token }) => {
    try {
        
        const response = await axiosConfig.put(`/workspace/${workspaceId}`, {
            name
        }, {
            headers: {
                'x-access-token': token
            }
        })

        console.log(response?.data)
        return response?.data?.data;

    } catch (error) {
        console.log("Error in update workspace request", error)
    }
}

export const addChannelToWorkspaceRequest = async ( { workspaceId, channelName, token } ) => {
    try {
        
        const response = await axiosConfig.put(`/workspace/${workspaceId}/channels`, {channelName}, {
            headers: {
                'x-access-token': token
            }
        })

        return response?.data?.data;

    } catch (error) {
        console.log('Error in add channel to workspace request', error.message);
    }
}

export const resetWorkspaceJoinCodeRequest = async ({ workspaceId, token }) => {
    try {
        
        const response = await axiosConfig.put(`/workspace/${workspaceId}/joincode/reset`,{}, {
            headers: {
                'x-access-token': token
            }
        })

        return response?.data?.data;

    } catch (error) {
        console.log('Error in reset workspace join code request', error.message);
    }
}

export const addMemberToWorkspaceRequest = async ( { workspaceId, token } ) => {
    try {

        const reponse = await axiosConfig.put(`/workspace/${workspaceId}/members`, {}, {
            headers: {
                'x-access-token': token
            }
        });

        return reponse?.data?.data;
        
    } catch (error) {
        console.log('Error in add member to workspace request', error.message);
    }
}

export const joinWorkspaceRqquest = async ( {workspaceId, joinCode, token} ) => {
        try {

        const reponse = await axiosConfig.put(`/workspace/${workspaceId}/join`, { joinCode }, {
            headers: {
                'x-access-token': token
            }
        });

        return reponse?.data?.data;
        
    } catch (error) {
        console.log('Error in join workspace request', error.message);
    }
}

export const getAllExistingWorkspaceRequest = async (token) => {
    try {

        const response = await axiosConfig.get(`/workspace/fetch/allWorkspaces`, {
            headers: {
                'x-access-token': token
            }
        });


        return response?.data?.data;
        
    } catch (error) {
        console.log('Error in get all existing workspace request', error.message);
        return [];
    }
}