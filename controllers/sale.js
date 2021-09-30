const {
  createService, listSalesService, updateSaleService,
} = require('../services/sales');

async function create(request, response) {
  try {
    const createSale = await createService(request.body);
    return response.status(200).json(createSale);
  } catch (error) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
}

async function list(request, response) {
  const id = request.params.id || null;
  try {
    const data = await listSalesService(id);
    return response.status(200).json(data);
  } catch (error) {
    return response.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
}

async function update(request, response) {
  try {
    const product = await updateSaleService(request.params.id, request.body);
    return response.status(200).json(product);
  } catch (error) {
    console.log(error);
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}

async function remove(request, response) {
  // try {
  //   const res = await deleteProductService(request.params.id);
  //   return response.status(200).json(res);
  // } catch (error) {
  //   return response.status(422).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong id format',
  //     },
  //   });
  // }
}

module.exports = { create, list, update, remove };
