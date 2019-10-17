const path = require('path');
const request = require('request');
const fs = require('fs')
const allAgent = [];
const allInfoCommand = [];
const allNumberBuild = [];

const router = (app, pathRepo) => {
    app.get(`/`, (req, res, next) => {
        res.sendFile('index.html', {root: path.join(__dirname, '../morkup')})
    });

    app.post(`/notify_agent`, (req, res, next) => {
        allAgent.push(req.body);
        res.end()
    });

    app.post('/notify_build_result', (req, res, next) => {
        console.log('notify_build_result --- done');
        fs.writeFile(`buildResult/${req.body.numberBuild}.json`, JSON.stringify(req.body), (err) =>{
            if(err) throw err; // если возникла ошибка
            console.log("Асинхронная запись файла завершена. ");
            allInfoCommand.push(req.body)
            res.end()
        })
        
    })

    app.post('/buildRequest', (req, res, nex) => {
        for(let i = 0; i < allAgent.length; i++){
            if(allAgent[i].free){
                const hostAgent = allAgent[i].host;
                const portAgent = allAgent[i].port;
                request.post(
                    `${hostAgent}:${portAgent}/`
                    ,
                    {
                        form: {
                            hash: req.body.hash,
                            nameCommand: req.body.nameCommand
                        }
                    },
                    function(err,httpResponse,body){
                        console.log(`${hostAgent}:${portAgent}`)
                        console.log('request done')
                        allNumberBuild.push(body);
                        res.send(body)
                    }
                )
                break
            }
        }
    })

    app.get(`/build/:number`, (req, res) => {
        const number = req.params.number
        for(let i = 0; i < allNumberBuild.length; i++){
            if(number === allInfoCommand[i].numberBuild){
                res.send(allInfoCommand[i])
                break
            }
        }
    })
}
module.exports = router;

