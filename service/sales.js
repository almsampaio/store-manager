const Joi = require('joi');
const sales = require('../model/sales');

const validation = (data) => {
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const result = data.map((res) => schema.validate(res));
  const { error } = result.find((err) => err !== null);
  return error;
};

const createSales = async (data) => {
  const error = validation(data);
  if (error) {
 return {
    statusCode: 422,
    json: {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
  }; 
}

  return {
    statusCode: 200,
    json: await sales.create(data),
  };
};

const getAllSales = async () => ({
    statusCode: 200,
    json: {
      sales: await sales.getAll(),
    },
  });

const findByIdSales = async (id) => {
  const result = await sales.findById(id);
  if (!result || result.length === 0) {
 return {
    statusCode: 404,
    json: {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    },
  }; 
}

  return {
    statusCode: 200,
    json: result[0],
  };
};

const updateSales = async (id, data) => {
  const error = validation(data);

  if (error) {
 return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    },
  }; 
}

  const result = await sales.update(id, data);
  return {
    statusCode: 200,
    json: result,
  };
};

const deleteSales = async (id) => {
  const result = await sales.deleteSales(id);

  if (!result) {
 return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    },
  }; 
}

  return {
    statusCode: 200,
    json: result.value,
  };
};

module.exports = {
  createSales,
  getAllSales,
  findByIdSales,
  updateSales,
  deleteSales,
};
