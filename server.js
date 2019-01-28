const express = require('express')
const mongoose = require('mongoose')
const parseFile = require('./parser/utilities/parseFile').parseFile

const app = express()
const port = 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)

    // Поставим по умолчанию mongoose подключение
    const mongoDB = 'mongodb://127.0.0.1/cian'
    mongoose.connect(mongoDB,  { useNewUrlParser: true })
    // Получение Mongoose для использования глобаного промиса
    // mongoose.Promise = Promise
    // Получение по умолчанию подключения
    const db = mongoose.connection

    // Привязать подключение к ошибке события ( получение уведомления ошибок подключение )
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
        console.log('MongoDb connected')
        parseFile(__dirname, 'sitemap2.xml')
    })
})


