const productModel = require('../models/productModel');

// const songModel = require('../models/songModel');

const getAll = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getById = async (id) => {
  const song = await productModel.getById(id);

  return song;
};

const register = async (name, quantity) => {
  if (!name) return { errorMessage: 'Name is required!' };

  if (!quantity) return { errorMessage: 'Quantity is required!' };

  const product = await productModel.findByName(name);

  if (product) return { err: { code: 'invalid_data', message: 'Product already exists' } };

  const createdProduct = await productModel.register(name, quantity);

  return createdProduct;
};
const update = async (id, name, quantity) => {
    const person = await productModel.update(id, name, quantity);
  
    return person;
  };

function validateName(req, res, next) {
    const { name } = req.body;
    if (typeof name !== 'string') {
        return res.status(422)
        .json(
            { err: 
                { code: 'invalid_data',
                 message: 'name has to ben an string' } },
);
    }
    if (name.length < 5) {
        return res.status(422)
        .json(
            { err: 
                { code: 'invalid_data',
                 message: '"name" length must be at least 5 characters long' } },
);
    }
    next();
    }

    function validateQuantity(req, res, next) {
        const { quantity } = req.body;
        if (quantity <= 0) {
            return res.status(422)
            .json(
                { err: 
                    { code: 'invalid_data',
                     message: '"quantity" must be larger than or equal to 1' } },
    );
        }
        if (typeof quantity !== 'number') {
            return res.status(422)
            .json(
                { err: 
                    { code: 'invalid_data',
                     message: '"quantity" must be a number' } },
    );
        }
        next();
        }
const remove = async (id) => {
  await productModel.remove(id);
};

module.exports = {
    register,
    validateName,
    validateQuantity,
    getAll,
    getById,
    update,
    remove,

}; 