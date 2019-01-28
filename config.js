Promise = require('bluebird')
// Импортировать модуль mongoose
const mongoose = require('mongoose')

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
