const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT ;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//solving CORS policy

app.use(cors());

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a root/default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Require Users routes
const userRoutes = require('./src/routes/user.routes')
// using as middleware
app.use('/api/users', userRoutes)

// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});