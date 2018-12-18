// Импортировать модуль mongoose
const mongoose = require('mongoose')

// Поставим по умолчанию mongoose подключение
const mongoDB = 'mongodb://127.0.0.1/cian'
mongoose.connect(mongoDB,  { useNewUrlParser: true })
// Получение Mongoose для использования глобаного промиса
mongoose.Promise = global.Promise
// Получение по умолчанию подключения
const db = mongoose.connection

// Привязать подключение к ошибке события ( получение уведомления ошибок подключение )
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDb connected')
})
//Define a schema
const Schema = mongoose.Schema;

const PageDataSchema = new Schema({
    pageData: Schema.Types.Mixed,
})

const ErrorSchema = new Schema({
    text: String,
})

const LogSchema = new Schema({
    log: String,
})
const LogFileSchema = new Schema({
    title: String,
    size: String,
})

const StatusSchema = new Schema({
    status: Boolean,
})

// Compile model from schema
const pageData = mongoose.model('pageData', PageDataSchema );
const errorData = mongoose.model('errorData', ErrorSchema );
const logData = mongoose.model('logData', LogSchema );
const logFileData = mongoose.model('logFileData', LogFileSchema );
const statusData = mongoose.model('statusData', StatusSchema );

module.exports.pageData = pageData
module.exports.errorData = errorData
module.exports.logData = logData
module.exports.logFileData = logFileData
module.exports.statusData = statusData
