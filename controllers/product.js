const { createService } = require('../services/product');

async function create(request, response) {
  try {
    const createProduct = await createService(request.body);
    return response.status(201).json(createProduct);
  } catch (error) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    });
  }
}

module.exports = { create };
