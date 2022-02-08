const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const carSchema = new Schema({
    brand: String,
    model: String,
    registration: {
        type: String,
        unique: true
    },
    characteristics: {
        productionDate : Date,
        FuelType : String,
        standardTirePSI: Number
    },
    maintenance: {
        lastOilChange: Number,
        lastBrakesChange: Number,
        lastTireChange: Number,
        lastChainChange: Number,
        lastOilFilterChange: Number,
        lastCamberReview: Number,
        lastWaterChange: Number,
        lastInspection: Date,
        additionalComments: String
    },
    refuel: {
        lastRefuelDate: Date,
        lastRefuelLiters: Number,
        lastRefuelPrice: Number,
        actualRefuelLiters: Number,
        actualRefuelPrice: Number,
        actualRefuelDate: {
            type: Date,
            default: Date.now
        },
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.cars, carSchema);