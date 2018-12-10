// Импортировать модуль mongoose
var mongoose = require('mongoose');

// Поставим по умолчанию mongoose подключение
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
// Получение Mongoose для использования глобаного промиса
mongoose.Promise = global.Promise;
// Получение по умолчанию подключения
var db = mongoose.connection;

// Привязать подключение к ошибке события ( получение уведомления ошибок подключение )
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

var ParserSchema = new Schema({
    text: String,
    mixed: Schema.Types.Mixed,
});

// Compile model from schema
var Parser = mongoose.model('Parser', ParserSchema );


module.exports.parser = Parser