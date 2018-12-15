const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const parseFn = require('./parser/app')

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
        res.json({msg: 'We are starting parser'})

        parseFn(io)
    } else {
        res.json({msg: 'We are stopping parser'})
    }
})


