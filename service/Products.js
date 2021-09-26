const Products = require('../models/Products');

const getAll = async () => {
    const products = await Products.getAll();
    return { status: 200, data: products };
};

const getById = async (id) => {
  const product = await Products.getById(id);
  if (!product) { 
    return { status: 422, message: 'Wrong id format' }; 
  }
    return { status: 200, data: product };
};

const create = async (name, quantity) => {
    const findProduct = await Products.findByName(name); // query de busca nome do produto
    const message = 'Product already exists'; 

if (findProduct) return { status: 422, message }; // se existir produto com mesmo nome 
const product = await Products.create(name, quantity); // query de inclusão do produto.
return { status: 201, data: product };
};

module.exports = { getAll, getById, create };
