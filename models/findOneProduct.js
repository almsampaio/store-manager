const connection = require('./connection');

const findOneProduct = async (name) => {
    const db = await connection();
    const [product] = await db.collection('products').find({ name }).toArray();
    return product; 
};

module.exports = findOneProduct;