const express = require('express');
const bodyparser = require('body-parser');
const db = require('./models');
const http = require('http');
const path = require("path");

const urlRoutes = require("./routes/url")

const app = express();

app.use(bodyparser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/api', urlRoutes)

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

db.sequelize
    .sync()
    .then((result) => {
        // Create an HTTP service.
        http.createServer(app).listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
