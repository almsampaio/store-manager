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

// requisito feito em colaboração com o colega João Anadrade T10 -A 
const updateProduct = async (id, name, quantity) => {
    const product = await Products.updateProduct(id, name, quantity);
    // console.log(product);
    return { status: 200, data: product };
};

const deleteProduct = async (id) => {
  const product = await Products.getById(id);
  const message = 'Wrong id format';

  if (!product) return { status: 422, message }; 
  const result = await Products.deleteProduct(id);
  return { status: 200, data: result };
};

module.exports = { getAll, getById, create, updateProduct, deleteProduct };
