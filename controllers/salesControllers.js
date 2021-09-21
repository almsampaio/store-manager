const { Router } = require('express');

const { getAllSales } = require('../middlewares/sales/getAllSales');
const { getSalesById } = require('../middlewares/sales/getSalesById');
const { createSales } = require('../middlewares/sales/createSales');

const { idProductValidation } = require('../middlewares/sales/idProductValidation');
const { quantityValidation } = require('../middlewares/sales/quantityValidation');
const { updateSales } = require('../middlewares/sales/updateSales');
const { idSaleValidation } = require('../middlewares/sales/idSaleValidation');

const router = Router();

router.get('/', getAllSales, async () => {
});
/* REQUISIÇÃO:
http GET :3000/sales
*/

router.get('/:id', getSalesById, async () => {
});
/* REQUISIÇÃO:
http GET :3000/sales/6147451f1a2a8beb28afd8b7   // ok
http GET :3000/sales/614745121a2a8beb28afd8b65  // erro
http GET :3000/sales/1000                       // erro
*/

router.post('/', quantityValidation, idProductValidation, createSales, async () => {
    // const { productId, quantity } = req.body;
    // const result = await productServices.create(productId, quantity);
    // const { status, err, data } = result;
    // if (err) { return res.status(status).json({ message: err.message }); }
    // return res.status(status).json(data);
});
/* REQUISIÇÃO:
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8b6", "quantity": 54 }]' | http POST :3000/sales  // ok
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8bX", "quantity": 54 }]' | http POST :3000/sales  // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8bX", "quantity": 0 }]' | http POST :3000/sales   // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8bX", "quantity": "0" }]' | http POST :3000/sales // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 } ]' | http POST :3000/sales   // ok
*/

router.put('/:id',
idSaleValidation, quantityValidation, idProductValidation, updateSales, async () => {});
/* REQUISIÇÃO:
http PUT :3000/sales/6147451f1a2a8beb28afd8b7S // erro

echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 100 }]' | http PUT :3000/sales/61490a8acee7ef280d4776ee

http PUT :3000/sales/6147451f1a2a8beb28afd8b7 name='notebook da xuxa ' quantity:=3     // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook multilaser' quantity:=3   // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook positivo' quantity:=3     // erro
*/

// router.delete('/:id',
// idMongodbValidation, idExistsValidation,
//   async (req, res) => {
//   const { id } = req.params;
//   const result = await productServices.remove(id);
//   const { status, err, data } = result;
//   if (err) { return res.status(status).json({ err }); }
//   return res.status(status).json(data);
// });
/* REQUISIÇÃO:
http DELETE :3000/products/6147af669098e4a27eea5cec   // ok
http DELETE :3000/products/6147954451d5a787ea071c23   // erro
*/

module.exports = router;
