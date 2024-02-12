const express = require('express');
const proxy = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/proxy.js')
const bodyParser = require('body-parser');
const multer = require('multer');
const axiosrequests = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/axiorequests');

const app = express();

app.get('/api/lists', async (req, res) => {
  const clientId = req.headers['client-id'];
  console.log(clientId);
  try {
    const result = await axiosrequests.listCall(clientId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
});

app.get('/api/clients', async (req, res) => {
  try {
    const result = await axiosrequests.clientCall();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
})

app.use(bodyParser.json());
app.use('/api', proxy.apiCustomerRecordProxy);
app.use('/api', proxy.apiCreateListProxy);
app.use('/api', proxy.apiCustomerDocumentProxy);


// Serve static files (your index.html and other assets)
app.use(express.static('public')); // Assuming your index.html file is in a 'public' directory
app.use('/scripts', express.static('scripts')); // Assuming your apiEndpoints.js file is located in a directory named 'scripts'

const upload = multer({ dest: 'C:/Users/Admin/Desktop/Campaign Monitor API + Website Build/files' });
app.use(upload.single('csvFile'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
