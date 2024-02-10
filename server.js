const express = require('express');
const proxy = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/proxy.js')

const app = express();

app.use('/api', proxy.apiListProxy);
app.use('/api', proxy.apiClientProxy);
app.use('/api', proxy.apiCustomerRecordProxy);
app.use('/scripts', express.static('scripts')); // Assuming your apiEndpoints.js file is located in a directory named 'scripts'

// Serve static files (your index.html and other assets)
app.use(express.static('public')); // Assuming your index.html file is in a 'public' directory

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
