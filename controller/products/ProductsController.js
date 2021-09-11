const createProductService = require('../../service/ProductsService');

const createProductController = async (req, res) => {
    const { name, quantity } = req.body;

    if (!name) return res.status(400).json({ message: 'nome nao informado' });
    if (!quantity) return res.status(400).json({ message: 'qty nao informado' });

    const product = await createProductService(name, quantity);
    
    return res.status(201).json({ product });
};

module.exports = createProductController;