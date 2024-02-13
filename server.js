const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./scripts/routes')
const app = express();

//invoke parser and routes
app.use(bodyParser.json());
app.use('/api', routes);

// Serve static files (your index.html and other assets)
app.use(express.static('public')); // Assuming your index.html file is in a 'public' directory
app.use('/scripts', express.static('scripts')); // Assuming your apiEndpoints.js file is located in a directory named 'scripts'

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
