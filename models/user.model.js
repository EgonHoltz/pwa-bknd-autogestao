const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const userSchema = new Schema({
    name: String,
    type: {
        type: String,
        default: "user"   
    },
    birthDate : Date,
    email : String,
    freeAddress: String,
    contact: String,
    auth: {
        username: {
            type: String,
            unique: true
        },
        password: String,
        publicKey: String,
        privateKey: String
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    access: {
        lastLoginDate: Date,
        ipAddress: String,
        loginSuccess: Boolean,
        client: String
    }
});
userSchema.pre("save", function (callback){
    this.auth.publicKey = Math.random().toString(36).substring(2) + this._id;
    this.auth.privateKey = Math.random().toString(36).substring(2) + this._id;
    
    callback();
})

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);