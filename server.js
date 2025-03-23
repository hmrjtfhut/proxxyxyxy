const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

// Default route to confirm server is working
app.get('/', (req, res) => {
    res.send("Proxy Server is Running! Use /proxy?url=https://example.com");
});

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('No URL provided');

    request(url, (error, response, body) => {
        if (error) return res.status(500).send('Error fetching page');
        res.send(body);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
