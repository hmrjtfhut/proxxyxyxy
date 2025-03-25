const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Allow all origins to make requests
app.use(cors());

// Proxy endpoint to handle website requests
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send('URL parameter is required');
    }

    // Add headers to make the request appear as a browser request
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
    };

    try {
        const response = await axios.get(targetUrl, { headers: headers });
        
        // Set proper content type for HTML responses
        res.set('Content-Type', 'text/html');
        res.send(response.data); // Send the HTML of the website to the frontend
    } catch (error) {
        // Log any errors for debugging purposes
        console.error('Error fetching the URL:', error.message);
        res.status(500).send('Error fetching the URL');
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
