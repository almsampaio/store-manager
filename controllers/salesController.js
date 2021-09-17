const status = require('http-status');
const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');
const generalError = require('../middlewares/error');

const getAllSales = async (_req, res) => {
    const sales = await salesModel.getAll();
    return res.status(status.OK).json({ sales });
};

const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await salesModel.getId(id);
        const msg = 'Sale not found';
        if (sale === null) {
            return res.status(status.NOT_FOUND)
            .json(generalError.notFound(msg)); 
        } 
        return res.status(status.OK).json(sale);
    } catch (error) {
        const msg = 'Sale not found';
        return res.status(status.NOT_FOUND).json(generalError.notFound(msg));
    }
};

const createSales = async (req, res) => {
    const objectSales = req.body;
    const responseMSG = await salesService.addValidation(objectSales);

    if (typeof (responseMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(responseMSG));
    } 
    return res.status(status.OK).json(responseMSG);
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    const array = req.body;
    const responseMSG = await salesService.updateValidation(id, array);
    if (typeof (responseMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(responseMSG));
    } 
        return res.status(status.OK).json(responseMSG);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const responseMSG = await salesService.deleteValidation(id);
    if (typeof (responseMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(responseMSG));
    } 
        return res.status(status.OK).json(responseMSG);
};

module.exports = { getAllSales, getSaleById, createSales, updateSale, deleteSale };