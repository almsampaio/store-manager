const { Router } = require('express');
const { createProduct } = require('../middlewares/products/createProduct');
const { formatNameValidation } = require('../middlewares/products/formatNameValidation');
const { uniqueNameValidation } = require('../middlewares/products/uniqueNameValidation');
const { quantityValidation } = require('../middlewares/products/quantityValidation');
const { idMongodbValidation } = require('../middlewares/products/idMongodbValidation');
const { idExistsValidation } = require('../middlewares/products/idExistsValidation');
const { deleteProduct } = require('../middlewares/products/deleteProduct');
const { getProductById } = require('../middlewares/products/getProductById');
const { getAllProduts } = require('../middlewares/products/getAllProduts');
const { updateProduct } = require('../middlewares/products/updateProduct');

const router = Router();

router.get('/:id', idMongodbValidation,
getProductById, async () => { });
/* REQUISIÇÃO:
http GET :3000/products/614745121a2a8beb28afd8b6   // ok
http GET :3000/products/614745121a2a8beb28afd8b65  // erro
http GET :3000/products/1000                       // erro
*/

router.put('/:id',
formatNameValidation, quantityValidation,
idMongodbValidation, idExistsValidation, updateProduct, async () => {});
/* REQUISIÇÃO:
http PUT :3000/products/61488c0bf0d60d5fb2c9b826 name='notebook da xuxa ' quantity:=3     // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook multilaser' quantity:=3   // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook positivo' quantity:=3     // erro
*/

router.delete('/:id', idMongodbValidation, idExistsValidation,
deleteProduct, async () => {});
/* REQUISIÇÃO:
http DELETE :3000/products/6149563287acf57acc10d57d   // ok
http DELETE :3000/products/6147954451d5a787ea071c23   // erro
*/

router.get('/', getAllProduts, async () => {});
/* REQUISIÇÃO:
http GET :3000/products
*/

router.post('/', formatNameValidation, uniqueNameValidation,
quantityValidation, createProduct, async () => {
});
/* REQUISIÇÃO:
http POST :3000/products/ name='notebook positivo' quantity:=1    // ok
http POST :3000/products/ name='ball' quantity:=4                   // erro
http POST :3000/products/ name='notebook multilaser' quantity:=0    // erro
http POST :3000/products/ name='notebook multilaser' quantity=3     // erro
*/

module.exports = router;
