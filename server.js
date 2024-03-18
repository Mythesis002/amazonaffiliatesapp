const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to store data
app.post('/store-data', (req, res) => {
    const { productUrl, phoneNumber, associateTag, timestamp } = req.body;
    const data = `${productUrl}, ${phoneNumber}, ${associateTag}, ${timestamp}\n`;

    fs.appendFile(path.join(__dirname, 'data.csv'), data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ error: 'Failed to store data' });
        } else {
            console.log('Data stored successfully:', data);
            return res.status(200).json({ message: 'Data stored successfully' });
        }
    });
});


// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
