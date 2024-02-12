const axios = require('axios');
const apiEndpoints = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/apiEndpoints');

const instance = axios.create({
    baseURL: 'https:/api.createsend.com/api/v3.3'
});

instance.defaults.headers.common['Authorization'] = apiEndpoints.apiKey;

const listCall = async (clientId) => {
    try {
        const response = await instance.get(`/clients/${clientId}/lists.json`,);
        return response.data;
    } catch (error) {
        console.error('Error in listCall: ', error);
        throw error;
    }
};

const clientCall = async () => {
    try {
        const response = await instance.get('/clients.json')
        return response.data;
    } catch (error) {
        console.error('Error in clientCall: ', error);
        throw error;
    }
};

module.exports = {
    listCall,
    clientCall
};

//https://api.createsend.com/api/v3.3/clients/{clientid}/lists.{xml|json}