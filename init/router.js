module.exports = (app) => {

    app.use('/cars/admin', require('../routes/car.admin.routes'));
    app.use('/cars', require('../routes/car.routes'));
    app.use('/auth', require('../routes/auth.routes'));
    app.use('/users/admin', require('../routes/user.admin.routes'));
    app.use('/users', require('../routes/user.routes'));
 
}