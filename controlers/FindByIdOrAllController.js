const { findByIdOrAllSales } = require('../services');

const errorJson = {
    err: {
        code: 'not_found',
        message: 'Sale not found',
    },
};

const findByIdOrAllSalesController = async (req, res) => {
    const { id } = req.params;
    if (id) {
        try {
            const sale = await findByIdOrAllSales(id);
            return res.status(200).json(sale);
        } catch (e) {
            return res.status(404).json(errorJson);
        }
    }
    const sales = await findByIdOrAllSales();
    return res.status(200).json({ sales });
};

module.exports = findByIdOrAllSalesController;