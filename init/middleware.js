module.exports = (app) => {
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const express = require('express');
    app.use(cors({
        origin: "*"
    }));
    app.options('*', cors());
    app.use((req, res, callback) => {
        console.log("req type: " + req.method + " req url: " + req.url)
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language, Location');
        res.header('Access-Control-Expose-Headers', 'Authorization, Language, Location');
        return callback();
    })

    app.use('./uploads', express.static('uploads'));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

    // parse application/json
    app.use(bodyParser.json({ limit: '1mb', extended: true }));
    app.use(cookieParser());
    app.set('trust proxy', 1);
}