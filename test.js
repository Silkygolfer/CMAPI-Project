require('dotenv').config({ path: 'local.env'});

const apiKey = process.env.API_KEY;
const auth = `Basic ${Buffer.from(`${apiKey}`).toString('base64')}`;

fetch("https://api.createsend.com/api/v3.3/clients.json", {
  "headers": {
    "authorization": `${auth}`
  }
})
.then(response => {
    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the response body as JSON
    return response.json();
  })
  .then(data => {
    // Log the parsed JSON data
    data.forEach(item => {
        console.log(item);
    })
})
  .catch(error => {
    // Log any errors that occurred during the fetch operation
    console.error('There was a problem with your fetch operation:', error);
  });