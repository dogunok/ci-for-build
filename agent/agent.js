const express = require('express');
const cors = require('cors');
const request = require('request');

const agentRoutes = require('./agent_routers.js');
const config = require('../config.json');

const serverPort = config.serverPort;
const agentPort = config.agentPort;
const pathRepo = config.repo;
const pathServer = `http://localhost:${serverPort}`
const app = express();


app.use(cors());
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

request.post(
    pathServer + '/notify_agent',
    {
        form:{
            port: agentPort,
            free: true,
            host: `http://localhost`
        }
    },
    function(err,httpResponse,body){
        console.log('done');
    }
)

agentRoutes(app, pathRepo, pathServer);



const server = app.listen(agentPort, err => {
    if(err) throw console.log(`error - ${err}`);
    console.log(`Server listening on port ${server.address().port}`);
});
