const { insertAndReturnSale, updateToSubtract } = require('../services');

const errorJson = {
    err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
    },
};

const insertSaleControler = async (req, res) => {
    const { body } = req;
    const newSale = await insertAndReturnSale(body);
    try {
        await updateToSubtract(body);    
    } catch (e) {
        console.log('insert catch');
        return res.status(404).json(errorJson);
    }
    return res.status(200).json(newSale);
};

module.exports = insertSaleControler;