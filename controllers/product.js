const { createService, listProductService } = require('../services/product');

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

async function list(request, response) {
  const id = request.params.id || null;
  try {
    const data = await listProductService(id);
    return response.status(200).json(data);
  } catch (error) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}

module.exports = { create, list };
