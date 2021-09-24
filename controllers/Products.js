const Products = require('../service/Products');

const getAll = async (_req, res) => {
    const { status, data } = await Products.getAll();
    res.status(status).json({ products: data });
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { status, data, message } = await Products.getById(id);
    if (message) {
 return res.status(status).json({
        err: { code: 'invalid_data', message },
    }); 
}
    res.status(status).json(data);
};

const create = async (req, res) => {
    const { name, quantify } = req.body;
    const { status, data, message } = await Products.create(name, quantify);
    if (message) {
 return res.status(status).json({
        err: { code: 'invalid_data', message },
    }); 
}
    res.status(status).json(data);
};

module.exports = { getAll, getById, create };
