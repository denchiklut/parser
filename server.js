const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const parseFn = require('./parser/app')
const PageData = require('./config').pageData
const LogData = require('./config').logData
const LogFileData = require('./config').logFileData
const StatusData = require('./config').statusData


const app = express()
const port = 5000
let server = app.listen(port, () => console.log(`Server started on port ${port}`))
//Socket setup
const io = socket(server)
// create application/json parser
const jsonParser = bodyParser.json()

io.on('connection', socket => {
    console.log('--- Server ----: Made socket connection', socket.id)
})

app.post('/api/parser', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    if (req.body.status === 'start') {
        res.json({msg: true})
        StatusData.remove({}, function(err) {
            if (err) console.log(err)
            console.log('statusData collection removed')
        });
        LogData.remove({}, function(err) {
            if (err) console.log(err)
            console.log('logData collection removed')
        });
        LogFileData.remove({}, function(err) {
            if (err) console.log(err)
            console.log('logFile collection removed')
        });

        let logData = new LogData({log: 'We are stopping parser'})
        logData.save(function (err) {
            if (err) console.log(err)
        });
        parseFn(__dirname, io)
    } else {
        io.emit('app-url', {data: 'We are stopping parser'});
        res.json({msg: false})

    }
})

app.get('/api/data', (req, res)=> {
    PageData.find({}).exec(function (err, data) {
        let arr = []
        data.map(item => {
            arr.push(item.pageData)
        })
       res.json({data: arr})
    })
})

app.get('/api/logs', (req, res)=> {
    LogData.find({}).exec(function (err, data) {
        let arr = []
        data.map(item => {
            arr.push(item)
        })
        res.json({data: arr})
    })
})

app.get('/api/status', (req, res)=> {
    StatusData.find({}).exec(function (err, data) {
        res.json({data: data})
    })
})

app.get('/api/logFile', (req, res)=> {
    LogFileData.find({}).exec(function (err, data) {
        let arr = []
        data.map(item => {
            arr.push(item)
        })
        res.json({data: arr})
    })
})


