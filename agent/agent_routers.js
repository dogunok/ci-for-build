const { execFile} = require('child_process');
const request = require('request');
const numberBuild = [];

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min;
    if(!numberBuild.includes(randomNumber)){
        numberBuild.push(randomNumber)
        return randomNumber
    }

    return getRandom(min, max);
}

const requestBuildInfo = (path, info) => {
    request.post(
        path,
        {
            form: {
                ...info
            }
        },
        (err, res, body) => {
            console.log('done request')
        }
    )
}

const agentRouter = (app, pathRepo, pathServer) => {
    app.post(`/`, (req, res, next) => {
        console.log('/')
        let executionTime = Date.now();
        const  startTime = new Date();
        const hashCommit = req.body.hash;
        const nameCommand = req.body.nameCommand.split(' ');
        const numberBuild = getRandom(100000, 999999);

        const infoFinishCommand = {
            time: {
                start: startTime,
                end: '',
                execution: ''
            },
            stdout: '',
            stderr: '',
            numberBuild: numberBuild,
            statusBuild: true
        }

        if(hashCommit){
            execFile('git' ,
            ['checkout', hashCommit],
            {cwd: pathRepo,
            maxBuffer: 100000}, (err, out) => {
                if(err) return res.send(err);
                console.log(`Сменил ветку ${hashCommit}`)
            });
        }

        execFile(
            nameCommand[0] ,
            nameCommand.slice(1),
            {cwd: pathRepo,
            maxBuffer: 1000000},
            (err, out, stderr) => {
                if(err) return res.send(JSON.stringify({error: err, numberBuild: numberBuild, statusBuild: false}));
                executionTime = Date.now() - executionTime;

                infoFinishCommand.time.execution = executionTime;
                infoFinishCommand.time.end = new Date();
                infoFinishCommand.stdout = out;
                infoFinishCommand.stderr = stderr;

                console.log(`${nameCommand[0]} ${nameCommand.slice(1).join(' ')} команда завершина`);
                console.log(numberBuild)
                console.log('Время выполнения = ', executionTime, 'ms');

                requestBuildInfo(pathServer + '/notify_build_result', infoFinishCommand)
                res.send(JSON.stringify(infoFinishCommand));
            }
        );
    });
}

module.exports = agentRouter;