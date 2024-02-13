const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const axiosrequests = require('/Users/Admin/Desktop/Campaign Monitor API + Website Build/scripts/axiorequests');

const app = express();
app.use(bodyParser.json());
const upload = multer({ dest: 'C:/Users/Admin/Desktop/Campaign Monitor API + Website Build/files' });

app.get('/api/lists', async (req, res) => {
  const clientId = req.headers['client-id'];
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
});

app.get('/api/customers', async (req, res) => {
  try {
    const listId = req.headers['list-id'];
    const result = await axiosrequests.customerCall(listId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
});

app.post('/api/createList', async (req, res) => {
  const clientId = req.headers['client-id'];
  const listName = req.body.listName;
  try {
    const result = await axiosrequests.listPost(clientId, listName);
    res.send(result.data);
  } catch (error) {
      res.status(500).json({ error: 'An error occured' });
  }
});

app.post('/api/fileUpload', upload.single('csvFile'), async (req, res) => {
  const listId = req.headers['list-id'];
  if (!req.file) {
    return res.status(400).json({ error: 'No File Uploaded' });
  }
  try {
    const response = await axiosrequests.documentPost(listId, req.file.path);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occured'});
  }
});

// Serve static files (your index.html and other assets)
app.use(express.static('public')); // Assuming your index.html file is in a 'public' directory
app.use('/scripts', express.static('scripts')); // Assuming your apiEndpoints.js file is located in a directory named 'scripts'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
