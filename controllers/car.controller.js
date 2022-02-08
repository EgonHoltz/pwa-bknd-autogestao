const Car = require('../models/car.model');
const {
    validationResult
} = require('express-validator');
const CarMessages = require("../messages/car.messages");

exports.get = (req, res) => {

    Car.find(req.query).exec((error, cars) => {
        if (error) throw error;

        let message = CarMessages.success.s2;

        if (cars.length < 0)
            message = CarMessages.success.s5;

        message.body = cars;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Car({
        brand: req.body.brand,
        model: req.body.model,
        characteristics: {
            productionDate: req.body.characteristics.productionDate,
            FuelType: req.body.characteristics.FuelType,
            standardTirePSI: req.body.characteristics.standardTirePSI,
        }
    }).save((error, Car) => {
        if (error) throw error;
        let message = CarMessages.success.s0;
        message.body = Car;
        return res.header("location", "/cars/" + Car._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Car.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, Car) => {
        if (error) throw error;
        if (!Car) return res.status(CarMessages.error.e0.http).send(CarMessages.error.e0);

        let message = CarMessages.success.s1;
        message.body = Car;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Car.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(CarMessages.error.e0.http).send(CarMessages.error.e0);
        return res.status(CarMessages.success.s3.http).send(CarMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Car.findOne({
        _id: req.params.id
    }).populate("comments.user", "name").exec((error, Car) => {
        if (error) throw error;
        if (!Car) return res.status(CarMessages.error.e0.http).send(CarMessages.error.e0);
        let message = CarMessages.success.s2;
        message.body = Car;
        return res.status(message.http).send(message);
    });

}

exports.updateMaintenance = (req,res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Car.findOneAndUpdate({
        _id: req.params.id
    }, {
        maintenance: {
            lastOilChange : req.body.maintenance.lastOilChange,
            lastBrakesChange : req.body.maintenance.lastBrakesChange,
            lastTireChange : req.body.maintenance.lastTireChange,
            lastChainChange : req.body.maintenance.lastChainChange,
            lastOilFilterChange : req.body.maintenance.lastOilFilterChange,
            lastCamberReview : req.body.maintenance.lastCamberReview,
            lastWaterChange : req.body.maintenance.lastWaterChange,
            lastInspection : req.body.maintenance.lastInspection,
            additionalComments : req.body.maintenance.additionalComments
        }
    }, {
        new: true
    }, (error, Car) => {
        if (error) throw error;
        if (!Car) return res.status(CarMessages.error.e0.http).send(CarMessages.error.e0);

        let message = CarMessages.success.s5;
        message.body = Car;
        return res.status(message.http).send(message);

    });
}

exports.updateRefuel = (req,res) =>{
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Car.findOneAndUpdate({
        _id: req.params.id
    }, {
        refuel: {
            actualRefuelLiters : req.body.refuel.actualRefuelLiters,
            actualRefuelPrice : req.body.refuel.actualRefuelPrice,
            actualRefuelDate : req.body.refuel.actualRefuelDate,
        }
    }, {
        new: true
    }, (error, Car) => {
        if (error) throw error;
        if (!Car) return res.status(CarMessages.error.e0.http).send(CarMessages.error.e0);

        let message = CarMessages.success.s6;
        message.body = Car;
        return res.status(message.http).send(message);

    });
}