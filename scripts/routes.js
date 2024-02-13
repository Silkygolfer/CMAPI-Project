const express = require('express');
const router = express.Router();
const axiosrequests = require('./axiorequests');
const multer = require('multer');
const upload = multer ({ dest: 'C:/Users/Admin/Desktop/Campaign Monitor API + Website Build/files'});


router.get('/lists', async (req, res) => {
    const clientId = req.headers['client-id'];
    try {
      const result = await axiosrequests.listCall(clientId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  });
  
  router.get('/clients', async (req, res) => {
    try {
      const result = await axiosrequests.clientCall();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  });
  
  router.get('/customers', async (req, res) => {
    try {
      const listId = req.headers['list-id'];
      const result = await axiosrequests.customerCall(listId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'An error occured' });
    }
  });
  
  router.post('/createList', async (req, res) => {
    const clientId = req.headers['client-id'];
    const listName = req.body.listName;
    try {
      const result = await axiosrequests.listPost(clientId, listName);
      res.send(result.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occured' });
    }
  });
  
  router.post('/fileUpload', upload.single('csvFile'), async (req, res) => {
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

  module.exports = router;