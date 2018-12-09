const express = require('express')
const bodyParser = require('body-parser')
const parseFn = require('./parser/app')

const app = express()
const port = 5000

// create application/json parser
const jsonParser = bodyParser.json()

app.post('/api/parser', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    if (req.body.status === 'start') {
        res.json({msg: 'We are starting parser'})
        parseFn()
    } else {
        res.json({msg: 'We are stoping parser'})
        console.log('stop parser')
    }
})

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'Denis', lastName: 'Aleksandrov'},
        {id: 2, firstName: 'Pasha', lastName: 'Lomtev'},
        {id: 3, firstName: 'Kirill', lastName: 'Erofeev'},
    ]
    res.json(customers)
})

app.listen(port, () => console.log(`Server started on port ${port}`))