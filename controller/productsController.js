const service = require('../service/productsService');

const addNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const operation = await service.addNewProduct({ name, quantity });
    res.status(201).json(operation);
};

module.exports = {
    addNewProduct,
};