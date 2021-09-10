const createProductService = require('../../service/ProductsService');

const createProductController = async (req, res) => {
    const { name, qty } = req.body;

    if (!name) return res.status(400).json({ message: 'nome nao informado' });
    if (!qty) return res.status(400).json({ message: 'qty nao informado' });

    const product = await createProductService(name, qty);

    return res.status(200).json({ product });
};

module.exports = createProductController;