module.exports = (app) => {
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    app.use(cors());
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

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())
    app.use(cookieParser());
    app.set('trust proxy', 1);


}