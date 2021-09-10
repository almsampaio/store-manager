const { deleteSale, findByIdOrAllSales } = require('../services');

const errorJson = {
    err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
    },
};

const deleteSaleController = async (req, res) => {
    const { id } = req.params;    
    try {
        const sale = await findByIdOrAllSales(id);
        await deleteSale(id);
        return res.status(200).json(sale);
    } catch (e) {
        return res.status(422).json(errorJson);
    }
};

module.exports = deleteSaleController;