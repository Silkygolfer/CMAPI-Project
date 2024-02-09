require('dotenv').config({ path: 'local.env'});


const apiKey = process.env.API_KEY;
const clientId = process.env.CM_CLIENT_ID;
const auth = `Basic ${Buffer.from(`${apiKey}`).toString('base64')}`;

fetch(`https://api.createsend.com/api/v3.3/clients/${clientId}/lists.json`, {
  method: 'GET',
  headers: {
    'Authorization': auth,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
  data.forEach(item => {
    console.log(item);
  })
})
.catch(error => {
  console.error('There was a problem with your fetch operation:', error);
});
