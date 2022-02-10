const express = require('express');
let router = express.Router();
const UserController = require('../controllers/user.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");



router.route('/')
    .post([body('name').isString(),
        body('birthDate').isISO8601(),
        body('email').isEmail(),
        body('freeAddress').isString(),
        body('contact').isString(),
        body('auth.username').isAlphanumeric(),
        body('auth.password').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('freeAddress').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('contact').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ], UserController.create)
    .get(AuthController.checkAuth, UserController.get);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], UserController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], UserController.delete);

module.exports = router;