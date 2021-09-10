const { updateAndReturnOne } = require('../services');

const updateAndReturnOneController = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const newProduct = {
        _id: id, name, quantity,
    };
    try {
        await updateAndReturnOne(id, { name, quantity });
        return res.status(200).json(newProduct);
    } catch (e) {
        return res.status(400).send('algo de errado');
    }
};

module.exports = updateAndReturnOneController;