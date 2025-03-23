const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('No URL provided');

    request({
        url: url,
        headers: {
            'User-Agent': req.headers['user-agent'],  // Forward user's browser agent
            'Referer': url,  // Helps bypass security checks
        }
    }, (error, response, body) => {
        if (error) return res.status(500).send('Error fetching page');
        res.send(body);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
