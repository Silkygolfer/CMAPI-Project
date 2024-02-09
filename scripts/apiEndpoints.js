const apiKey = `Basic ${btoa('Tk0mv7ENnrYE9YaJkyuKikq8CRpVk6itSs0MGYrTXxiHoyCjNXjCO2uUY/6IK3rjsx5ucqAf8lNfmIgSC72gm1wh6c7DRjn5IA+mRUuozdFTb+f0b3oS7FcoYuP/PsnTnOph1NGeVQGH5PfxCs9veA==')}`;

const apiEndpoints = {
    apiKey,
    cmList: (clientId) => `https://api.createsend.com/api/v3.3/clients/${clientId}/lists.json`,
    cmClient: (clientId) => `https://api.createsend.com/api/v3.3/clients/${clientId}.json`
  };

  
  
module.exports = apiEndpoints;
  