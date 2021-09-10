const insertAndReturnOne = require('../services/insertAndReturnOne');

const insertOneControler = async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await insertAndReturnOne({ name, quantity });
    res.status(201).json(newProduct);
};

module.exports = insertOneControler;