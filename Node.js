const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('No URL provided');

    request(url, (error, response, body) => {
        if (error) return res.status(500).send('Error fetching page');
        res.send(body);
    });
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
