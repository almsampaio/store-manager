const Products = require('../models/Products');

const create = async (name, quantify) => {
    const findProduct = await Products.findByName(name); // query de busca nome do produto
    const message = 'product already exists'; 

if (findProduct) return { status: 422, message }; // se existir produto com mesmo nome 
const product = await Products.create(name, quantify); // query de inclusão do produto.
return { status: 201, data: product };
};

module.exports = create;
