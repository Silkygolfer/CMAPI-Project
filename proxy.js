const { createProxyMiddleware } = require('http-proxy-middleware');
const apiEndpoints = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/apiEndpoints')
const csvToJson = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/dataprocessing.js');

// Proxy middleware -> return lists after passing clientID as param
/*const apiListProxy = createProxyMiddleware('/api/lists', {
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
        proxyReq.end();
    }
});
*/

/*
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
        proxyReq.end();
    }
});
*/

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
        proxyReq.end();
    }
});

const apiCreateListProxy = createProxyMiddleware('/api/createList', {
    target: 'https://api.createsend.com/api/v3.3',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const clientId = req.url.split('/')[3];
        const rewrittenPath = `/lists/${clientId}.json`;
        return rewrittenPath;
    },
    onProxyReq: (proxyReq, req) => {
        // Extract the value for Title from the client-side input
        const title = req.body.name; // Assuming title is passed in the request body
        // Construct the request body with the dynamic Title value
        const bodyData = JSON.stringify({
            Title: title,
            UnsubscribeSetting: "AllClientLists",
            ConfirmedOptIn: false,
        });
    
        // Set headers before writing the request body
        proxyReq.setHeader('Authorization', apiEndpoints.apiKey);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    
        // Write the request body and end the request
        proxyReq.write(bodyData);
        proxyReq.end();
    },
    onProxyRes: (proxyRes, req, res) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    }       
});

/*(const apiCustomerDocumentProxy = createProxyMiddleware('/api/fileUpload', {
    target: 'https://api.createsend.com/api/v3.3',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const listId = req.url.split('/')[3];
        const rewrittenPath = `/subscribers/${listId}/import.json`;
        console.log(rewrittenPath);
        return rewrittenPath;
    },
    onProxyReq: async (proxyReq, req, res) => {
        try {
            // Set headers
            proxyReq.setHeader('Authorization', apiEndpoints.apiKey);
            proxyReq.setHeader('Content-Type', 'application/json');

            // Parse base64 data from payload
            const base64data = req.body.base64data;

            // Decode base64 data
            const buffer = Buffer.from(base64data, 'base64');
            const csvData = buffer.toString('utf-8');

            // Transform CSV data to JSON asynchronously
            const jsonData = await csvToJson(csvData);
            console.log(jsonData);

            // Convert jsonData to JSON string before setting content length
            const jsonString = JSON.stringify(jsonData);

            //write and end proxyreq
            proxyReq.write(jsonString);
            proxyReq.end();
        } catch (error) {
            console.error('Error processing CSV file:', error);
            res.status(500).send("Proxy Error");
        }
    },
    onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Proxy Error");
    }
});
*/

const apiCustomerDocumentProxy = createProxyMiddleware('/api/fileUpload', {
    target: 'https://api.createsend.com/api/v3.3',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const listId = req.url.split('/')[3];
        console.log(listId);
        const rewrittenPath = `/subscribers/${listId}/import.json`;
        return rewrittenPath;      
}
});



module.exports = { 
    apiCustomerRecordProxy,
    apiCustomerDocumentProxy,
    apiCreateListProxy
};