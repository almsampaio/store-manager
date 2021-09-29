const {
  createService,
} = require('../services/sales');

async function create(request, response) {
  try {
    const createSale = await createService(request.body);
    return response.status(200).json(createSale);
  } catch (error) {
    console.log(error);
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
}

async function list(request, response) {
  // const id = request.params.id || null;
  // try {
  //   const data = await listProductService(id);
  //   return response.status(200).json(data);
  // } catch (error) {
  //   return response.status(422).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong id format',
  //     },
  //   });
  // }
}

async function update(request, response) {
  // try {
  //   const product = await updateProductService(request.params.id, request.body);
  //   return response.status(200).json(product);
  // } catch (error) {
  //   return response.status(422).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong id format',
  //     },
  //   });
  // }
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
