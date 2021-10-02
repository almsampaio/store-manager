//     const sinon = require('sinon');
//     const { expect } = require('chai');

//     const productServices = require('../../services/products');
//     const productModels = require('../../models/products');

//     describe('Ao chamar os services de products', () => {
//     describe('chamando a função "addProduct"', () => {
//     describe('com menos de 5 caracteres', () => {
//         const name = 'prod';
//         const quantity = 10

//         it('retorna erro de comprimento inválido', async () => {
//         const result = await productServices.addProduct(name, quantity);

//         expect(result).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
//         });
//     });

//     describe('com um nome já existente', () => {
//         const name = 'produto teste';
//         const quantity = 10

//         before(() => {
//         sinon.stub(productModels, 'getProductByName').resolves(true);
//         });

//         after(() => productModels.getProductByName.restore());

//         it('com um nome já existente retorna erro', async () => {
//         const result = await productServices.createProduct(name, quantity);

//         expect(result).to.be.deep.equal({ message: 'Product already exists' });
//         });
//     });

//     describe('com quantidade menor ou igual a 0', () => {
//         const name = 'produto teste';
//         const quantity = 0;

//         before(() => sinon.stub(productModels, 'getProductByName').resolves(false))

//         after(() => productModels.getProductByName.restore());

//         it('retorna erro de quatidade inválida', async () => {
//         const result = await productServices.createProduct(name, quantity);

//         expect(result).to.be.deep.equal({ message: '"quantity" must be larger than or equal to 1' });
//         });
//     });

//     describe('com quantidade em formato de string', () => {
//         const name = 'produto teste';
//         const quantity = '10';

//         before(() => sinon.stub(productModels, 'getProductByName').resolves(false))

//         after(() => productModels.getProductByName.restore());

//         it('retorna erro de quatidade inválida', async () => {
//         const result = await productServices.createProduct(name, quantity);

//         expect(result).to.be.deep.equal({ message: '"quantity" must be a number' });
//         });
//     });

//     describe('com sucesso', () => {
//         const name = 'produto teste';
//         const quantity = 10;

//         const mockReturn = {
//         _id: '222222222222',
//         name: 'produto teste',
//         quantity: 10,
//         };

//         before(() => {
//         sinon.stub(productModels, 'getProductByName').resolves(false);
//         sinon.stub(productModels, 'createProduct').resolves(mockReturn);
//         })

//         after(() => {
//         productModels.getProductByName.restore();
//         productModels.createProduct.restore();
//         });

//         it('retorna o produto cadastrado', async () => {
//         const result = await productServices.createProduct(name, quantity);

//         expect(result).to.be.deep.equal(mockReturn);
//         });
//     });
//     });

//     describe('chamando a função "getProductById"', () => {
//     describe('com um Id incorreto', () => {
//         const id = 0;

//         before(() => sinon.stub(productModels, 'getProductById').resolves(null));

//         after(() => productModels.getProductById.restore());

//         it('retorna erro de formato incorreto', async () => {
//         const result = await productServices.getProductById(id);

//         expect(result).to.be.deep.equal({ message: 'Wrong id format' });
//         });
//     });

//     describe('com um Id incorreto', () => {
//         const id = '5f43ba333200020b101fe4a0';

//         const mockReturn = {
//         _id: '5f43ba333200020b101fe4a0',
//         name: 'produto teste',
//         quantity: 10
//         };

//         before(() => sinon.stub(productModels, 'getProductById').resolves(mockReturn));
        
//         after(() => productModels.getProductById.restore());

//         it('retorna o produto criado', async () => {
//         const result = await productServices.getProductById(id);

//         expect(result).to.be.deep.equal(mockReturn);
//         });
//     });
//     });

//     describe('chamando a função "getProducts"', () => {
//     describe('com sucesso', () => {
//         const mockReturn = [{
//         _id: '5f43ba333200020b101fe4a0',
//         name: 'produto teste',
//         quantity: 10
//         },
//         {
//         _id: '5f43ba333200020b1018e4a0',
//         name: 'produto teste 2',
//         quantity: 20
//         }];

//         before(() => sinon.stub(productModels, 'getProducts').resolves(mockReturn));

//         after(() => productModels.getProducts.restore());

//         it('retorna com sucesso os itens cadastrados', async () => {
//         const result = await productServices.getProducts();

//         expect(result).to.be.deep.equal({ products: mockReturn });
//         });
//     });
//     });

//     describe('chamando a função "updateProduct', () => {
//     describe('com nome menor que 5 caracteres', () => {
//         const id = '5f43ba333200020b101fe4a0';
//         const name = 'prod';
//         const quantity = 10;

//         const error = {
//         message: '"name" length must be at least 5 characters long',
//         };

//         it('retorna comprimento inválido', async () => {
//         const result = await productServices.updateProduct(id, name, quantity);

//         expect(result).to.be.deep.equal(error);
//         });
//     });

//     describe('com quantidade inválida', () => {
//         const id = '5f43ba333200020b101fe4a0';
//         const name = 'produto teste';
//         const quantity = 0;

//         const error = {
//         message: '"quantity" must be larger than or equal to 1',
//         };

//         it('retorna comprimento inválido', async () => {
//         const result = await productServices.updateProduct(id, name, quantity);

//         expect(result).to.be.deep.equal(error);
//         });
//     });

//     describe('com id inválido', () => {
//         const id = 0;
//         const name = 'produto teste';
//         const quantity = 10;

//         const error = {
//         message: 'Wrong id format',
//         };

//         before(() => sinon.stub(productModels, 'updateProduct').resolves(null));

//         after(() => productModels.updateProduct.restore());

//         it('retorna comprimento inválido', async () => {
//         const result = await productServices.updateProduct(id, name, quantity);

//         expect(result).to.be.deep.equal(error);
//         });
//     });

//     describe('com sucesso', () => {
//         const id = '5f43ba333200020b101fe4a0';
//         const name = 'produto teste';
//         const quantity = 10;

//         const mockReturn = {
//         id: '5f43ba333200020b101fe4a0',
//         name: 'produto teste',
//         quantity: 10,
//         };

//         before(() => sinon.stub(productModels, 'updateProduct').resolves(mockReturn));

//         after(() => productModels.updateProduct.restore());

//         it('retorna comprimento inválido', async () => {
//         const result = await productServices.updateProduct(id, name, quantity);

//         expect(result).to.be.deep.equal(mockReturn);
//         });
//     });
//     });

//     describe('chamando a função "deleteById"', () => {
//     describe('passando um id inválido', () => {
//         const id = 0;

//         const error = {
//         message: 'Wrong id format',
//         };

//         before(() => sinon.stub(productModels, 'deleteById').resolves(null));

//         after(() => productModels.deleteById.restore());

//         it('retorna erro de formato inválido', async () => {
//         const result = await productServices.deleteById(id);

//         expect(result).to.be.deep.equal(error);
//         });
//     });

//     describe('com sucesso', () => {
//         const id = '5f43ba333200020b101fe4a0';

//         before(() => sinon.stub(productModels, 'deleteById').resolves(true));

//         after(() => productModels.deleteById.restore());

//         it('retorna o produto deletado', async () => {
//         const result = await productServices.deleteById(id);

//         expect(result).to.be.equal(true);
//         });
//     });
//     });
//     });

//     const salesServices = require('../../services/sales');
//     const salesModels = require('../../models/sales');

//     describe('Ao chamar os services de sales', () => {
//     describe('chamando a função "createSales"', () => {
//     describe('com sucesso', () => {
//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 10,
//         }];

//         const mockReturn = {
//         _id: '5f43ba333200020b101fe4a0',
//         itensSold,
//         };

//         before(() => {
//         sinon.stub(salesModels, 'createSales').resolves([mockReturn]);
//         sinon.stub(productModels, 'getProductById').resolves(mockReturn);
//         });

//         after(() => {
//         salesModels.createSales.restore();
//         productModels.getProductById.restore();
//         });

//         it('retorna venda cadastrada', async () => {
//         const result = await salesServices.createSales(itensSold);

//         expect(result).to.be.deep.equal({ result: mockReturn });
//         });
//     });

//     describe('informando quantidade 0', () => {
//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 0,
//         }];

//         const mockReturn = {
//         _id: '5f43ba333200020b101fe4a0',
//         itensSold,
//         };

//         const error = {
//         err: {
//             code: 'invalid_data',
//             message: 'Wrong product ID or invalid quantity',
//         },
//         };

//         before(() => {
//         sinon.stub(salesModels, 'createSales').resolves([mockReturn]);
//         sinon.stub(productModels, 'getProductById').resolves(mockReturn);
//         });

//         after(() => {
//         salesModels.createSales.restore();
//         productModels.getProductById.restore();
//         });

//         it('retorna erro de dados de produto inválido', async () => {
//         const result = await salesServices.createSales(itensSold);

//         expect(result).to.be.deep.equal({ error });
//         });
//     });

//     describe('informando quantidade maior que em estoque', () => {
//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 10,
//         }];

//         const mockReturn = {
//         _id: '5f43ba333200020b101fe4a0',
//         itensSold: [{
//             productId: '5f43ba273200020b101fe49f',
//             quantity: 20,
//         }],
//         };

//         const mockProduct = {
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 5,
//         }

//         const error = {
//         err: {
//             code: 'stock_problem',
//             message: 'Such amount is not permitted to sell', 
//         },
//         };

//         before(() => {
//         sinon.stub(salesModels, 'createSales').resolves([mockReturn]);
//         sinon.stub(productModels, 'getProductById').resolves(mockProduct);
//         });

//         after(() => {
//         salesModels.createSales.restore();
//         productModels.getProductById.restore();
//         });

//         it('retorna erro de problema de estoque', async () => {
//         const result = await salesServices.createSales(itensSold);

//         expect(result).to.be.deep.equal({ error });
//         });
//     });
//     });

//     describe('chamando a função "getSales"', () => {
//     describe('com sucesso', () => {
//         const mockReturn = [{
//         _id: '5f43ba333200020b101fe4a0',
//         itensSold: [{
//             productId: '5f43ba273200020b101fe49f',
//             quantity: 20,
//         }],
//         },
//         {
//         _id: '5f85ba323200020b101fe4a0',
//         itensSold: [{
//             productId: '5f43ba273200020b101fe49f',
//             quantity: 5,
//         }],
//         }];

//         before(() => sinon.stub(salesModels, 'getSales').resolves(mockReturn));

//         after(() => salesModels.getSales.restore());

//         it('retorna uma lista com todas as vendas', async () => {
//         const result = await salesServices.getSales();
        
//         expect(result).to.be.deep.equal({ sales: mockReturn });
//         });
//     });
//     });

//     describe('chamando a função "getSalesById"', () => {
//     describe('com sucesso', () => {
//         const id = '5f43ba333200020b101fe4a0';

//         const mockReturn = {
//         _id: '5f43ba333200020b101fe4a0',
//         itensSold: [{
//             productId: '5f43ba273200020b101fe49f',
//             quantity: 20,
//         }],
//         };

//         before(() => sinon.stub(salesModels, 'getSalesById').resolves(mockReturn));

//         after(() => salesModels.getSalesById.restore());

//         it('retorna a venda correspondente', async () => {
//         const result = await salesServices.getSalesById(id);
        
//         expect(result).to.be.deep.equal({ sales: mockReturn });
//         });

//         it('chama a função "getSalesById" com o parâmetro id', () => {
//         expect(salesModels.getSalesById.calledWith(id)).to.be.equal(true);
//         });
//     });

//     describe('com id inválido', () => {
//         const id = 0;

//         const error = {
//         err: {
//             code: 'not_found',
//             message: 'Sale not found',
//         },
//         };

//         before(() => sinon.stub(salesModels, 'getSalesById').resolves(null));

//         after(() => salesModels.getSalesById.restore());

//         it('retorna uma lista com todas as vendas', async () => {
//         const result = await salesServices.getSalesById(id);
        
//         expect(result).to.be.deep.equal({ error: error });
//         });
//     });
//     });

//     describe('chamando a função "updateSales"', () => {
//     describe('com sucesso', () => {
//         const id = '5f43ba333200020b101fe4a0';

//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 10,
//         }];

//         const mockReturn = {
//         _id: id,
//         itensSold,
//         };

//         before(() => sinon.stub(salesModels, 'updateSale').resolves(mockReturn));

//         after(() => salesModels.updateSale.restore());

//         it('retorna a venda atualizada', async () => {
//         const result = await salesServices.updateSale(id, itensSold);

//         expect(result).to.be.deep.equal({ result: mockReturn });
//         });

//         it('chama a função models.updateSales com os parâmetros id e itensSold', async () => {
//         expect(salesModels.updateSale.calledWith(id, itensSold)).to.be.equal(true);
//         });
//     });

//     describe('com dados de produto inválidos', () => {
//         const id = '5f43ba333200020b101fe4a0';

//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 0,
//         }];

//         const mockReturn = {
//         _id: '5f43ba333200020b101fe4a0',
//         itensSold,
//         };

//         const error = {
//         err: {
//             code: 'invalid_data',
//             message: 'Wrong product ID or invalid quantity',
//         },
//         };

//         before(() => sinon.stub(salesModels, 'updateSale').resolves(mockReturn));

//         after(() => salesModels.updateSale.restore());

//         it('retorna erro de dados de produtos inválidos', async () => {
//         const result = await salesServices.updateSale(id, itensSold);

//         expect(result).to.be.deep.equal({ error });
//         });
//     });

//     describe('com id inválido', () => {
//         const id = 0;

//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 10,
//         }];

//         const error = {
//         err: {
//             code: 'invalid_data',
//             message: 'Wrong product ID or invalid quantity',
//         },
//         };

//         before(() => sinon.stub(salesModels, 'updateSale').resolves(null));

//         after(() => salesModels.updateSale.restore());

//         it('retorna erro de dados de produtos inválidos', async () => {
//         const result = await salesServices.updateSale(id, itensSold);

//         expect(result).to.be.deep.equal({ error });
//         });
//     });
//     });

//     describe('chamando a função "deleteSale"', () => {
//     describe('com sucesso', () => {
//         const id = '5f43ba333200020b101fe4a0';

//         const itensSold = [{
//         productId: '5f43ba273200020b101fe49f',
//         quantity: 10,
//         }];

//         const mockReturn = {
//         _id: id,
//         itensSold,
//         };

//         before(() => sinon.stub(salesModels, 'deleteSale').resolves(mockReturn));

//         after(() => salesModels.deleteSale.restore());

//         it('retorna venda deletada', async () => {
//         const result = await salesServices.deleteSale(id);

//         expect(result).to.be.deep.equal({ result: mockReturn });
//         });

//         it('chama a função salesModels.deleteSale com o parâmetro "id"', () => {
//         expect(salesModels.deleteSale.calledWith(id)).to.be.equal(true);
//         });
//     });

//     describe('com um id inválido', () => {
//         const id = 0;

//         const error = {
//         err: {
//             code: 'invalid_data',
//             message: 'Wrong sale ID format',
//         },
//         };

//         before(() => sinon.stub(salesModels, 'deleteSale').resolves(null));

//         after(() => salesModels.deleteSale.restore());

//         it('retorna erro de dados de venda inválido', async () => {
//         const result = await salesServices.deleteSale(id);

//         expect(result).to.be.deep.equal({ error })
//         })
//     });
//     });
// });