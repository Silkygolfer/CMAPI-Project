const { createProxyMiddleware } = require('http-proxy-middleware');
const apiEndpoints = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/apiEndpoints')

// Proxy middleware -> return lists after passing clientID as param
const apiListProxy = createProxyMiddleware('/api/lists', {
    target: 'https://api.createsend.com/api/v3.3', // Base target URL
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const clientId = req.url.split('/')[3]; // Extract clientId from the request URL
        const rewrittenPath = `/clients/${clientId}/lists.json`; // Construct the target URL with clientId
        console.log('Rewritten path:', rewrittenPath); // Log the rewritten path
        return rewrittenPath;
    },
    onProxyReq: (proxyReq, req) => {
        // Add authentication header to the proxied request
        proxyReq.setHeader('Authorization', apiEndpoints.apiKey);
    }
});

// Proxy middleware -> return client names + clientIDs
const apiClientProxy = createProxyMiddleware('/api/clients', {
    target: 'https://api.createsend.com/api/v3.3/clients.json', // Base target URL
    changeOrigin: true,
    pathRewrite: (path, req) => {
        // Replace the entire path with an empty string
        return '';
    },
    onProxyReq: (proxyReq, req) => {
        // Log final target URL 
        console.log('Final URL: ', proxyReq.path);
        // Add authentication header to the proxied request
        console.log(apiEndpoints.apiKey);
        proxyReq.setHeader('Authorization', apiEndpoints.apiKey);
    }
});

// proxy middleware -> return records in list
const apiCustomerRecordProxy = createProxyMiddleware('/api/customers', {
    target: 'https://api.createsend.com/api/v3.3',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const listId = req.url.split('/')[3]; //extract the List Id from the request URL
        const rewrittenPath = `/lists/${listId}/active.json?page={1-100}`; // construct target URL with list ID
        console.log('Rewritten path: ',rewrittenPath); // log the path
        const fullUrl = `${req.protocol}://${req.get('host')}${rewrittenPath}`; // construct full URL
        console.log('Full API call URL: ', fullUrl); // log the full URL
        return rewrittenPath;
    },
    onProxyReq: (proxyReq, req) => {
        //add authentication header to proxied request
        proxyReq.setHeader('Authorization', apiEndpoints.apiKey);
    }
});


module.exports = {
    apiListProxy, 
    apiClientProxy,
    apiCustomerRecordProxy
};