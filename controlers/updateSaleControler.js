const { updateOneSale, updateSumAndSubtract } = require('../services');

const errorJson = {
    err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
    },
};

const updateSaleControler = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await updateSumAndSubtract(id, body);
    } catch (e) {
        console.log('update catch');
       return res.status(404).json(errorJson);
    }
    const response = await updateOneSale(id, body);
    const responseJson = {
        _id: id,
        itensSold: body,
    };
    if (response) return res.status(200).json(responseJson);
};

module.exports = updateSaleControler;