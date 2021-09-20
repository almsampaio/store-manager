const { Router } = require('express');

const { getAllSales } = require('../middlewares/sales/getAllSales');
const { getSalesById } = require('../middlewares/sales/getSalesById');
const {
  quantityValidation,
  idValidtaion,
  createSales,
} = require('../middlewares/sales/createSales');

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
http GET :3000/products/614745121a2a8beb28afd8b65  // erro
http GET :3000/products/1000                       // erro
*/

router.post('/', quantityValidation, idValidtaion, createSales, async () => {
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

// router.put('/:id',
// formatNameValidation, quantityValidation,
// idMongodbValidation, idExistsValidation, async (req, res) => {
//   const { name, quantity } = req.body;
//   const { id } = req.params;
//   const result = await productServices.update(id, name, quantity);
//   const { err } = result;
//   if (err) { return res.status(err.code).json({ message: err.message }); }
//   return res.status(200).json(result);
// });
/* REQUISIÇÃO:
http PUT :3000/products/61488c0bf0d60d5fb2c9b826 name='notebook da xuxa ' quantity:=3     // ok
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
