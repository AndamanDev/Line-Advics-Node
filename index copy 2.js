const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.json({ result: "OK", data: [1, 2, 3, 4, 5] });
});

app.listen(PORT, () => {
    console.log('server is running');
});
