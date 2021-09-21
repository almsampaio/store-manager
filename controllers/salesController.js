const salesService = require('../services/salesService');

function errorDefault(err) {
  return {
    status: err.status || 500,
    code: err.code || 'server_error',
    message: err.message,
  };
}

async function create(req, res, next) {
  try {
    const itensSold = req.body;
    const newSalesId = await salesService.create(itensSold);

    res.status(200).json({
      _id: newSalesId,
      itensSold,
    });
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id: _id } = req.params;
    const itensSold = req.body;

    await salesService.update(_id, itensSold);

    res.status(200).json({ _id, itensSold });
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

// async function deleteDocument(req, res, next) {
//   try {
//     const { id } = req.params;

//     const deletedDocument = await salesService.deleteDocument(id);

//     res.status(200).json(deletedDocument);
//   } catch (err) {
//     const error = errorDefault(err);

//     next(error);
//   }
// }

async function getAll(_req, res, next) {
  try {
    const allDocuments = await salesService.getAll();

    res.status(200).json({ sales: allDocuments });
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const document = await salesService.getById(id);

    res.status(200).json(document);
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

module.exports = {
  create,
  update,
  // deleteDocument,
  getAll,
  getById,
};
