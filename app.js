const port = process.env.PORT || 8010;
const host = process.env.HOST || '0.0.0.0';
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


require('./init/db.js')(app, () => {
  //require('./init/middleware')(app);
  require('./init/router')(app);
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log('Your app is listening on ' + port);
  });
});
