const express = require('express');
let router = express.Router();
const CarController = require('../controllers/car.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, CarController.getAllCars)


module.exports = router;