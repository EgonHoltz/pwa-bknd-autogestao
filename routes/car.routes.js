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
    .get(AuthController.checkAuth, CarController.get)
    .post(AuthController.checkAuth, [
        body('brand').isString(),
        body('model').isString(),
        body('registration').isString(),
        body('characteristics.productionDate').isISO8601(),
        body('characteristics.FuelType').isString(),
        body('characteristics.standardTirePSI').isNumeric(),
        sanitizeBody('brand').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('model').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('registration').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ], CarController.create);
    
    router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], CarController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], CarController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], CarController.delete);
    
    router.route('/:id/maintenance')
    .post(AuthController.checkAuth, [
        param('id').isMongoId(),
        body('lastOilChange').isNumeric(),
        body('lastBrakesChange').isNumeric(),
        body('lastTireChange').isNumeric(),
        body('lastChainChange').isNumeric(),
        body('lastOilFilterChange').isNumeric(),
        body('lastCamberReview').isNumeric(),
        body('lastWaterChange').isNumeric(),
        body('lastInspection').isISO8601(),
        body('additionalComments').isString(),
        sanitizeBody('additionalComments').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], CarController.updateMaintenance);
    
    router.route('/:id/refuel')
    .post(AuthController.checkAuth, [
        param('id').isMongoId(),
        body('actualRefuelLiters').isNumeric(),
        body('actualRefuelPrice').isNumeric()
    ], CarController.updateRefuel);


module.exports = router;