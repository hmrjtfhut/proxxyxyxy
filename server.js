const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

// Proxy any website (no site blocking)
app.get('/proxy', (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).send("No URL provided");

    // Fix URLs without http/https
    if (!url.startsWith("http")) url = "https://" + url;

    request({
        url: url,
        headers: {
            'User-Agent': req.headers['user-agent'],
            'Referer': url,
        }
    }).pipe(res); // Stream the response directly
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
