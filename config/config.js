module.exports = {
    mongodb: {
        uri: 'mongodb+srv://AutoMngmentAdm:KUS7eC7TR3t52NqV@automanagementclstr.xzsgr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        collections: {
            cars: 'cars',
            user: 'users',
        }
    },
    auth: {
        expiration_time: 9999999,
        issuer: "EHO"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}