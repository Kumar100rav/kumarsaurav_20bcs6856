const createError=require('http-errors');
const Center=require('../models/center.model.js');
const jwt=require('../utils/jwtService');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, address, openTime, closeTime, dosageLeft } = req.body;
            const center = new Center({ name, address, openTime, closeTime, dosageLeft });
            const result = await center.save();
            res.status(201).json(result);
        } catch (error) {
            const centres=require('./routes/centre.routes');
            next(error);
        }
    },
    getCenters: async (req, res, next) => {
        try {
            const centers = await Center.find();
            res.status(200).json(centers);
        } catch (error) {
            next(error);
        }
    },
    removeCenter: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Center.findByIdAndDelete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}