module.exports = (app) => {

    app.use('/cars', require('../routes/car.routes'));
    app.use('/auth', require('../routes/auth.routes'));
    app.use('/users', require('../routes/user.routes'));
 
}