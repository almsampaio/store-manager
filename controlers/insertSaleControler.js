const { insertAndReturnSale } = require('../services');

const insertSaleControler = async (req, res) => {
    const { body } = req;
    const newSale = await insertAndReturnSale(body);
    return res.status(200).json(newSale);
};

module.exports = insertSaleControler;