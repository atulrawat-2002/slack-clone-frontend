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

        console.log('response in create workspace', response)
        return response?.data;

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
        console.log('Response in fetch work space request', response)
        return response.data;

    } catch (error) {

        console.log('Error in fetch workspace requesr', error.message);
        throw error;

    }
} 