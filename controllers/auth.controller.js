const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const AuthMessages = require("../messages/auth.messages");
const UserMessages = require("../messages/user.messages");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.getInfo = (req, res) => {
    let message = AuthMessages.success.s1;
    message.body = req.user;
    return res.status(message.http).send(message);
}

exports.login = (req, res) => {
    //TODO: review the login to enable JWT
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    let username = req.body.username;
    let password = escape(req.body.password);

    User.findOne({
        "auth.username": username
    }, (error, user) => {
        if (error) throw error;
        let access = {}
        let actualDate = new Date
        let id = user._id;
        if (req != undefined && req.rawHeaders != undefined && req.rawHeaders.length >22){
            let browser = req.rawHeaders[7].split(",")[1].split(";")[0].replace(/["]+/g, '').trim() +", " + req.rawHeaders[7].split(",")[1].split(";")[1].replace(/["]+/g, '');
            let soWithBrowser = req.rawHeaders[15].replace(/["]+/g, '') + " - " + browser;
            access = {
                lastLoginDate: actualDate,
                ipAddress: req.rawHeaders[21],
                loginSuccess: true,
                client: soWithBrowser
            }
        } else {
            access = {
                lastLoginDate: actualDate,
                loginSuccess: true
            }
        }
        if (!user || !bcrypt.compareSync(password, user.auth.password)){
            access.loginSuccess = false
            return res.header("Authorization", null).status(AuthMessages.error.e0.http).send(AuthMessages.error.e0);
        }
        if (!user.active){
            access.loginSuccess = false
            return res.header("Authorization", null).status(AuthMessages.error.e2.http).send(AuthMessages.error.e2);
        }

        let payload = {
            pk: user.auth.publicKey
        }

        let options = {
            expiresIn: CONFIG.auth.expiration_time,
            issuer: CONFIG.auth.issuer
        };

        User.updateOne({
            _id: id
        }, {
            $set: {
                access: access
            }
        }, (error, result) => {
            if (error) console.log(error);    
        });
        
        user.access = access;
        let token = JWT.sign(payload, user.auth.privateKey, options);

        let message = AuthMessages.success.s0;
        message.body = user;
        return res.header("Authorization", token).status(message.http).send(message);

    });

}

exports.checkAuth = (req, res, callback) => {

    let token = req.headers.authorization;
    if (!token) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

    let payload = JWT.decode(token);

    User.findOne({
        "auth.publicKey": payload.pk
    }, (error, user) => {
        if (error) throw error;
        if (!user) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

        JWT.verify(token, user.auth.privateKey, (error) => {
            if (error) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

            req.user = user;
            return callback();

        });

    });

};