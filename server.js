const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const apiEndpoints = require('./scripts/apiEndpoints.js'); // Adjust the path as necessary

// Proxy middleware
// Proxy middleware
const apiProxy = createProxyMiddleware('/api/lists', {
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
  

app.use('/api', apiProxy);
app.use('/scripts', express.static('scripts')); // Assuming your apiEndpoints.js file is located in a directory named 'scripts'

// Serve static files (your index.html and other assets)
app.use(express.static('public')); // Assuming your index.html file is in a 'public' directory

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
