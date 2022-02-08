const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const userSchema = new Schema({
    name: String,
    type: String,
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
    }
});
userSchema.pre("save", (cb)=>{
    //this.auth.publicKey = Math.random().toString(36).substring(2) + this._id;
    //this.auth.privateKey = Math.random().toString(36).substring(2) + this._id;
    
    cb();
})

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);