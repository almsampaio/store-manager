const { Router } = require('express');
const productServices = require('../services/productsServices');
const {
  nameValidation,
  quantityValidation,
} = require('../validations/createProductValidations');

const router = Router();

router.get('/', async (_req, res) => {
    const result = await productServices.getAll();
    const { status, err, data } = result;
    console.log(data);
    if (err) { return res.status(status).json({ message: err.message }); }
    return res.status(status).json(data);
});
/* REQUISIÇÃO:
http GET :3000/products
*/

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  const { err } = result;
  if (err) { return res.status(err.code).json({ message: err.message }); }
  return res.status(200).json(result);
});
/* REQUISIÇÃO:
http GET :3000/products/614745121a2a8beb28afd8b6   // ok
http GET :3000/products/614745121a2a8beb28afd8b65  // erro
*/

router.post('/', nameValidation, quantityValidation, async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productServices.create(name, quantity);
    const { err } = result;
    if (err) { return res.status(err.code).json({ message: err.message }); }
    return res.status(200).json(result);
});
/* REQUISIÇÃO:
http POST :3000/products/ name='notebook multilaser' quantity:=1    // ok
http POST :3000/products/ name='ball' quantity:=4                   // erro
http POST :3000/products/ name='notebook multilaser' quantity:=0    // erro
http POST :3000/products/ name='notebook multilaser' quantity=3     // erro
*/

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productServices.update(id, name, quantity);
  const { err } = result;
  if (err) { return res.status(err.code).json({ message: err.message }); }
  return res.status(200).json(result);
});
/* REQUISIÇÃO:
http PUT :3000/products/6147a6c74b6a379358a38c04 name='notebook positivo' quantity:=3   // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook multilaser' quantity:=3   // ok
http PUT :3000/products/6147954451d5a787ea071c23 name='notebook positivo' quantity:=3   // erro
*/

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productServices.remove(id);
  const { err } = result;
  if (err) { return res.status(err.code).json({ message: err.message }); }
  return res.status(200).json(result);
});
/* REQUISIÇÃO:
http DELETE :3000/products/6147a747f2cd56953247bec4   // ok
http DELETE :3000/products/6147954451d5a787ea071c23 // erro
*/

module.exports = router;
