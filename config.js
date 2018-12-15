// Импортировать модуль mongoose
const mongoose = require('mongoose');

// Поставим по умолчанию mongoose подключение
const mongoDB = 'mongodb://127.0.0.1/cian';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
// Получение Mongoose для использования глобаного промиса
mongoose.Promise = global.Promise;
// Получение по умолчанию подключения
const db = mongoose.connection;

// Привязать подключение к ошибке события ( получение уведомления ошибок подключение )
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
const Schema = mongoose.Schema;

const ParserSchema = new Schema({
    text: String,
    mixed: Schema.Types.Mixed,
});

// Compile model from schema
const Parser = mongoose.model('Parser', ParserSchema );


module.exports.parser = Parser