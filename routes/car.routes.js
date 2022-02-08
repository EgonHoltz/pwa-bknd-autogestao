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
        body('id').isMongoId(),
        body('maintenance.lastOilChange').isNumeric(),
        body('maintenance.lastBrakesChange').isNumeric(),
        body('maintenance.lastTireChange').isNumeric(),
        body('maintenance.lastChainChange').isNumeric(),
        body('maintenance.lastOilFilterChange').isNumeric(),
        body('maintenance.lastCamberReview').isNumeric(),
        body('maintenance.lastWaterChange').isNumeric(),
        body('maintenance.lastInspection').isISO8601(),
        body('maintenance.additionalComments').isString(),
        sanitizeBody('maintenance.additionalComments').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], CarController.updateMaintenance);
    
    router.route('/:id/refuel')
    .post(AuthController.checkAuth, [
        body('id').isMongoId(),
        body('refuel.actualRefuelLiters').isNumeric(),
        body('refuel.actualRefuelPrice').isNumeric(),
        body('refuel.actualRefuelDate').isISO8601()
    ], CarController.updateRefuel);


module.exports = router;