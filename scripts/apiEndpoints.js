require('dotenv').config({ path: '/Users/Admin/Desktop/Campaign Monitor API + Website Build/local.env' }); // Specify the path to your .env file

const unencodedApiKey = process.env.API_KEY;
apiKey = `Basic ${Buffer.from(`${unencodedApiKey}:`).toString('base64')}`;


const apiEndpoints = {
    apiKey,
    cmList: (clientId) => `https://api.createsend.com/api/v3.3/clients/${clientId}/lists.json`,
    cmClient: (clientId) => `https://api.createsend.com/api/v3.3/clients/${clientId}.json`
  };

  
  
module.exports = apiEndpoints;
  