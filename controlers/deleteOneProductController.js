const {
    deleteOneProduct,
    findManyOrByIdProducts,
} = require('../services');

const err = {
    code: 'invalid_data',
    message: 'Wrong id format',
};

const deleteOneProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await findManyOrByIdProducts(id);
        await deleteOneProduct(id);
        return res.status(200).json(product);
    } catch (e) {
        return res.status(422).json({ err });
    }
};

module.exports = deleteOneProductController;