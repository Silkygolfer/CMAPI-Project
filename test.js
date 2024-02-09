fetch("https://api.createsend.com/api/v3.3/clients.json", {
  "headers": {
    "authorization": "Basic VGswbXY3RU5ucllFOVlhSmt5dUtpa3E4Q1JwVms2aXRTczBNR1lyVFh4aUhveUNqTlhqQ08ydVVZLzZJSzNyanN4NXVjcUFmOGxOZm1JZ1NDNzJnbTF3aDZjN0RSam41SUErbVJVdW96ZEZUYitmMGIzb1M3RmNvWXVQL1BzblRuT3BoMU5HZVZRR0g1UGZ4Q3M5dmVBPT06"
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