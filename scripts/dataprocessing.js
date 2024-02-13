const fs = require('fs');
const csv = require('csv-parser');

function csvToJson(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        // Create a readable stream from the file
        const fileStream = fs.createReadStream(filePath);

        fileStream
            .pipe(csv())
            .on('data', (data) => {
                // Transform each row of CSV into the format required by the API
                const subscriber = {
                    EmailAddress: data.email, // Assuming 'email' is the column header for email addresses
                    Name: data.name,
                    ConsentToTrack: data.tracking,
                    ConsentToSendSms: data.sms // Assuming 'name' is the column header for names
                    // You may need to add other properties such as MobileNumber, CustomFields, ConsentToTrack, etc.
                };
                results.push(subscriber);
            })
            .on('end', () => {
                // Wrap the array of subscribers in an object with the appropriate structure
                const jsonData = {
                    Subscribers: results,
                    Resubscribe: true, // You may need to adjust these values based on your requirements
                    QueueSubscriptionBasedAutoResponders: false,
                    RestartSubscriptionBasedAutoresponders: true
                };
                resolve(jsonData);
            }) 
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = csvToJson;
