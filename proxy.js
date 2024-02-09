const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api', {
  target: 'https://api.createsend.com',
  changeOrigin: true,
  // Add any additional configuration options here
});

module.exports = apiProxy;
