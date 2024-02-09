//API GET to CM
export async function fetchDataFromApi(apiEndpoint, options = {}) {
    try {
      const response = await fetch(apiEndpoint, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  