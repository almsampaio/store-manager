const {
  // STATUS_CREATED,
  STATUS_OK,
} = require('../CONSTANTS/httpStatusCode');

const {
  insertManySalesIntoSomeDB,
} = require('../SERVICES/SalesService');

async function postOneSale(req, res) {
  const salesToInsert = req.body;
  const responseFromInsert = await insertManySalesIntoSomeDB(salesToInsert);
  if (responseFromInsert.err) {
    return res.status(responseFromInsert.statusCode).json({ err: responseFromInsert.err });
  }
  return res.status(STATUS_OK).json(responseFromInsert);
}

module.exports = {
  postOneSale,
};
