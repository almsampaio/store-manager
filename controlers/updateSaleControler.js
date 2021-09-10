const { updateOneSale } = require('../services');

const updateSaleControler = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const response = await updateOneSale(id, body);
    const responseJson = {
        _id: id,
        itensSold: body,
    };
    if (response) return res.status(200).json(responseJson);
};

module.exports = updateSaleControler;