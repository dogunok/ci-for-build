const express = require('express');
const cors = require('cors');

const routes = require('./routers.js');
const config = require('../config.json');

const port = config.serverPort;
const pathRepo = config.repo
const app = express();


app.use(cors())
app.use(express.static('static'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app, pathRepo)

const server = app.listen(port, err => {
    if(err) throw console.log(`error - ${err}`)
    console.log(`Server listening on port ${server.address().port}`);
});

