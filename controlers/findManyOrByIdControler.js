const { findManyOrByIdProducts } = require('../services');

const err = {
    code: 'invalid_data',
    message: 'Wrong id format',
};

const findManyOrByIdControler = async (req, res) => {
    const { id } = req.params;    
    if (id) {
        try {
            const product = await findManyOrByIdProducts(id);       
            return res.status(200).json(product);
        } catch (e) {
            return res.status(422).json({ err });
        }   
    }
    const products = await findManyOrByIdProducts();
    return res.status(200).json({ products });
};

module.exports = findManyOrByIdControler;