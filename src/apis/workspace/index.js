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

        const response = await axiosConfig.get(`/workspace/${workspaceId}`, {
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
        
        const response = await axiosConfig.put(`/workspace/${workspaceId}`, {name}, {
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