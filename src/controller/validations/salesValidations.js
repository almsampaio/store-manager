const { ObjectId } = require('mongodb');

const mongoConnection = require('../../model/connection');

function quantityMustBeGreateThenOne(quantity) {
  if (Number(quantity) < 1) {
    return true;
  }
}

function quantityMustBeANumber(quantity) {
  if (typeof quantity === 'string') {
    return true;
  }
}

function isValidId(id) {
  if (id && !ObjectId.isValid(id)) {
    return true;
  }
}

function productValidation(req, res, next) {
  const sales = req.body;

  sales.forEach((sale) => {
    const { _id, quantity } = sale;

    const notValid = quantityMustBeANumber(quantity) 
    || quantityMustBeGreateThenOne(quantity)
    || isValidId(_id);

    if (notValid) {
      return res.status(422).json({ err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } });
    }
  });

  next();
}

async function saleExistsValidation(req, res, next) {
  const { id } = req.params;

  const db = await mongoConnection();
  const salesCollection = await db.collection('sales');

  let sale = null;

  if (ObjectId.isValid(id)) {
    sale = await salesCollection.findOne({ _id: ObjectId(id) });
  } 
  
  if (sale === null) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
}

module.exports = { productValidation, saleExistsValidation };