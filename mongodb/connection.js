//mongodb/mongoose
const mongoose = require('mongoose');

const DB_URL = require('./config/datasource.config');

mongoose.Promise = require('bluebird');
mongoose.connect(DB_URL.url, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', function (error) {
  console.log('[DB ERROR] - Database connection error: ' + error);
});

db.on('open', function () {
  console.log('Database connection established');
});

db.on('reconnectFailed', function (error) {
  console.error("[DB ERROR] - DB connection failed: " + error);
})

db.on('disconnected', function () {
  console.error("[DB ERROR] - DB disconnected");
});

// check this event called for unhandled
process.on('SIGINT', function () {
  db.close(function () {
    console.log("[DB ERROR] - Mongoose connection is disconnected due to application termination");
    process.exit(1);
  });
});

// var status = ['disconnected', 'connected', 'connecting', 'disconnecting'];

module.exports = {
  'connection': mongoose.connection
};

//

//'0': 'disconnected',
//'1': 'connected',
//'2': 'connecting',
//'3': 'disconnecting',
//'99': 'uninitialized'
