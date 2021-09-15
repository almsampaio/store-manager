const {
  // STATUS_CREATED,
  STATUS_OK,
} = require('../CONSTANTS/httpStatusCode');

const {
  insertOneSaleIntoSomeDB,
  findAllSalesInSomeDB,
  getOneSaleInSomeDBByID,
  updateOneSaleInSomeDBByID,
  deleteOneSaleFromSomeDBByID,
} = require('../SERVICES/SalesService');

async function postOneSale(req, res) {
  const salesToInsert = req.body;
  const responseFromInsert = await insertOneSaleIntoSomeDB(salesToInsert);
  if (responseFromInsert.err) {
    return res.status(responseFromInsert.statusCode).json({ err: responseFromInsert.err });
  }
  return res.status(STATUS_OK).json(responseFromInsert);
}

async function getAllSales(_req, res) {
  const allSales = await findAllSalesInSomeDB();
  if (allSales.err) return res.status(allSales.statusCode).json({ err: allSales.err });
  return res.status(STATUS_OK).json(allSales);
}

async function getOneSaleByID(req, res) {
  const { id } = req.params;
  const sale = await getOneSaleInSomeDBByID(id);
  if (sale.err) return res.status(sale.statusCode).json({ err: sale.err });
  return res.status(STATUS_OK).json(sale);
}

async function putOneSaleByID(req, res) {
  const { id } = req.params;
  const saleToUpdate = req.body;
  const sale = await updateOneSaleInSomeDBByID(id, saleToUpdate);
  if (sale.err) return res.status(sale.statusCode).json({ err: sale.err });
  return res.status(STATUS_OK).json(sale);
}

async function deleteOneSaleByID(req, res) {
  const { id } = req.params;
  const sale = await deleteOneSaleFromSomeDBByID(id);
  if (sale.err) return res.status(sale.statusCode).json({ err: sale.err });
  return res.status(STATUS_OK).json(sale);
}

module.exports = {
  postOneSale,
  getAllSales,
  getOneSaleByID,
  putOneSaleByID,
  deleteOneSaleByID,
};
