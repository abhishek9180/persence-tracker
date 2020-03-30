const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const mySqlConnection = require('./mysql/connection');
// Static files
const staticRouter = require('./routes/static/static.route');
// Routers
const loginRouter = require('./routes/auth/login.route');
const logoutRouter = require('./routes/auth/logout.route');
const reportRouter = require('./routes/report/report.route')

const app = express();
const port = process.env.PORT || 5000;

app.set('port', port);
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

// expose dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Connect to MySQL DB
mySqlConnection.connectToDB().then(connection => {
    console.log("Connected to MySQL ", connection.threadId);
}).catch(error => {
    console.log("Error in Connecting MySQL ", error);
    process.exit(0);
});

// Add headers
app.use('/api/*', function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Content-Type', 'application/json');

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTION, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);


    // Pass to next layer of middleware
    next();
});



// API routes
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
// app.use('/api/report', reportRouter);

// Handle invalid routes
app.use('*', (req, res) => {
    res.status(404).send('Not found');
})




server.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`open url http://localhost:${port}`);
})

