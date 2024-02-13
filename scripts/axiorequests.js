const axios = require('axios');
const apiEndpoints = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/apiEndpoints');
const csvToJson = require('./dataprocessing');

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

const customerCall = async (listId) => {
    try {
        const response = await instance.get(`/lists/${listId}/active.json`);
        return response.data;
    } catch (error) {
        console.error('Error in customerCall: ', error);
        throw error;
    }
};

const listPost = async (clientId, listName) => {
    try {
        const response = await instance.post(`lists/${clientId}.json`, listName);
        return response;
    } catch (error) {
        console.error('Error in customerCall: ', error);
        throw error;
    }
};

const documentPost = async (listId, csvData) => {
    const convert = await csvToJson(csvData);
    console.log(convert);
    try {
        const response = await instance.post(`/subscribers/${listId}/import.json`, convert);
        return response;
    } catch (error) {
        console.error('Error in documentPost: ', error);
        throw error;
    }
};

module.exports = {
    listCall,
    clientCall,
    customerCall,
    listPost,
    documentPost
};

//https://api.createsend.com/api/v3.3/clients/{clientid}/lists.{xml|json}