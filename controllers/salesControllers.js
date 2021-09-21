const { Router } = require('express');

const { getAllSales } = require('../middlewares/sales/getAllSales');
const { getSalesById } = require('../middlewares/sales/getSalesById');
const { createSales } = require('../middlewares/sales/createSales');
const { idProductValidation } = require('../middlewares/sales/idProductValidation');
const { quantityValidation } = require('../middlewares/sales/quantityValidation');
const { updateSales } = require('../middlewares/sales/updateSales');
const { idSaleValidation } = require('../middlewares/sales/idSaleValidation');
const { removeSales } = require('../middlewares/sales/removeSales');
const { quantityStockValidation } = require('../middlewares/sales/quantityStockValidation');
const { updateStockSales } = require('../middlewares/sales/updateStockSales');

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
*/

router.post('/',
quantityValidation,
idProductValidation,
quantityStockValidation,
updateStockSales,
createSales, async () => {
});
/* REQUISIÇÃO:
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }]' | http POST :3000/sales  // ok
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8bX", "quantity": 54 }]' | http POST :3000/sales  // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8bX", "quantity": 0 }]' | http POST :3000/sales   // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 }, {"productId": "614745121a2a8beb28afd8bX", "quantity": "0" }]' | http POST :3000/sales // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 56 } ]' | http POST :3000/sales   // ok
*/

router.put('/:id',
idSaleValidation,
quantityValidation,
idProductValidation,
updateSales, async () => {});
/* REQUISIÇÃO:
http PUT :3000/sales/6147451f1a2a8beb28afd8b7S // erro
echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 100 }]' | http PUT :3000/sales/61490a8acee7ef280d4776ee
*/

router.delete('/:id',
idSaleValidation,
removeSales, async () => { });
/* REQUISIÇÃO:
http DELETE :3000/sales/61490a8acee7ef280d4776ee    // ok
http DELETE :3000/sales/61490a8acee7ef280d4776ees   // error
*/

module.exports = router;
