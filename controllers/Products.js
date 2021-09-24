const Products = require('../service/Products');

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

module.exports = create;
