const express = require('express');
const app = express();
const os = require('os');

console.log('Kubia server starting...');

let requestCount = 0;

app.get('/', (_req, res) => {
    ++requestCount;
    if (requestCount > 5) {
        res.status(500).send('I am not well. Please restart me!');
        return;
    }
    res.status(200).send(`You have hit ${os.hostname()}`);
});

app.listen(8080);
