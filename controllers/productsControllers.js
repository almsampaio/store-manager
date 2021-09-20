const { Router } = require('express');
const productServices = require('../services/productsServices');
const {
  formatNameValidation,
  uniqueNameValidation,
  quantityValidation,
} = require('../validations/createProductValidations');
const {
  idMongodbValidation,
  idExistsValidation,
} = require('../validations/searchProductValidations');

const router = Router();

router.get('/:id', idMongodbValidation, async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  const { status, err, data } = result;
  if (err) { return res.status(status).json({ err }); }
  return res.status(status).json(data);
});
/* REQUISIÇÃO:
http GET :3000/products/614745121a2a8beb28afd8b6   // ok
http GET :3000/products/614745121a2a8beb28afd8b65  // erro
http GET :3000/products/1000                       // erro
*/

router.put('/:id',
formatNameValidation, quantityValidation,
idMongodbValidation, idExistsValidation, async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productServices.update(id, name, quantity);
  const { err } = result;
  if (err) { return res.status(err.code).json({ message: err.message }); }
  return res.status(200).json(result);
});
/* REQUISIÇÃO:
http PUT :3000/products/61488c0bf0d60d5fb2c9b826 name='notebook da xuxa ' quantity:=3     // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook multilaser' quantity:=3   // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook positivo' quantity:=3     // erro
*/

router.delete('/:id',
idMongodbValidation, idExistsValidation,
  async (req, res) => {
  const { id } = req.params;
  const result = await productServices.remove(id);
  const { status, err, data } = result;
  if (err) { return res.status(status).json({ err }); }
  return res.status(status).json(data);
});
/* REQUISIÇÃO:
http DELETE :3000/products/6147af669098e4a27eea5cec   // ok
http DELETE :3000/products/6147954451d5a787ea071c23   // erro
*/

router.get('/', async (_req, res) => {
  const result = await productServices.getAll();
  const { status, err, data } = result;
  if (err) { return res.status(status).json({ err }); }
  return res.status(status).json({ products: data });
});
/* REQUISIÇÃO:
http GET :3000/products
*/

router.post('/', formatNameValidation, uniqueNameValidation,
quantityValidation, async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productServices.create(name, quantity);
    const { status, err, data } = result;
    if (err) { return res.status(status).json({ message: err.message }); }
    return res.status(status).json(data);
});
/* REQUISIÇÃO:
http POST :3000/products/ name='notebook positivo' quantity:=1    // ok
http POST :3000/products/ name='ball' quantity:=4                   // erro
http POST :3000/products/ name='notebook multilaser' quantity:=0    // erro
http POST :3000/products/ name='notebook multilaser' quantity=3     // erro
*/

module.exports = router;
