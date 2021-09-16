const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../models/ProductModel');
const ProductService = require('../../services/ProductService');
const ProductSchema = require('../../schemas/ProductSchema');

const SalesModel = require('../../models/SalesModel');
const SalesSchema = require('../../schemas/SalesSchema');
const SalesService = require('../../services/SalesService');

// CREATE PRODUCT
describe('Testando a função `create` do service ProductService', () => {
  describe('quando o payload informado não é válido', () => {
    describe('pois o nome não atente aos requisitos', () => {
      const payloadProduct = {
        name: 'abc',
        quantity: 10,
      }

      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await ProductService.create(payloadProduct);

        expect(err).to.have.property('message');
        expect(err).to.have.property('code');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"name" length must be at least 5 characters long');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade é um valor menor ou igual a 0', async () => {
      const payloadProduct = {
        name: 'abcde',
        quantity: 0,
      }

      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await ProductService.create(payloadProduct);

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"quantity" must be larger than or equal to 1');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade não é um número', () => {
      const payloadProduct = {
        name: 'abcdef',
        quantity: '1',
      }

      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err } = response;

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"quantity" must be a number');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois o produto já foi cadastrado', () => {
      const payloadProduct = {
        name: 'abcdefg',
        quantity: 1,
      }

      before(async () => {
        sinon.stub(ProductSchema, 'productExists')
          .resolves({
              err: { code: 'invalid_data', message: 'Product already exists' },
          })

        await ProductService.create(payloadProduct);
      });
  
      after(() => {
        ProductSchema.productExists.restore();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err } = response;

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('Product already exists');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });
  });

  describe('quando é inserido com sucesso', () => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';

    const payloadProduct = {
      name: 'abcdefgh',
      quantity: 1,
    }

    before(() => {
      sinon.stub(ProductModel, 'create')
        .resolves({
          _id: ID_EXAMPLE,
          name: payloadProduct.name,
          quantity: payloadProduct.quantity,
        });

        sinon.stub(ProductSchema, 'productExists')
        .resolves({});
    });

    after(() => {
      ProductModel.create.restore();
      ProductSchema.productExists.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('o objeto retornado possui as keys "id", "name" e "quantity" do produto inserido', async () => {
      const payloadProduct = {
        name: 'abcdefghij',
        quantity: 1,
      }

      const response = await ProductService.create(payloadProduct);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

// getAll PRODUCT

describe('Testando a função getAll do service ProductService' ,() => {
  describe('quanto não existe nenhum produto cadastrado' ,() => {
    before(() => {
      sinon.stub(ProductModel, 'getAll')
        .resolves({products: []});
    });

    after(() => {
      ProductModel.getAll.restore();
    });

    it('retorna o object "products" contento um array', async () => {
      const response = await ProductService.getAll();
      const { products } = response;

      expect(products).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await ProductService.getAll();
      const { products } = response;

      expect(products).to.be.empty;
    });
  });

  describe('quanto existem produtos cadastrados' ,() => {
    before(() => {
      sinon.stub(ProductModel, 'getAll')
        .resolves({
          products: [
            {
              _id: '604cb554311d68f491ba5781',
              name: 'Produto Silva',
              quantity: 1,
            }
          ]
      });
    });

    it('retorna o object "products" contento um array', async () => {
      const response = await ProductService.getAll();
      const { products } = response;

      expect(products).to.be.an('array');
    });

    it('o array retornado não está vazio', async () => {
      const response = await ProductService.getAll();
      const { products } = response;

      expect(products).to.not.be.empty;
    });

    it('o array retornado possui dados do tipo objeto', async () => {
      const response = await ProductService.getAll();
      const { products } = response;
      const  [firstProduct] = products;

      expect(firstProduct).to.be.an('object');
    });

    it('todos os objetos possuem os atributos "id", "name" e "quantity"', async () => {
      const response = await ProductService.getAll();
      const { products } = response;
      const  [firstProduct] = products;

      expect(firstProduct).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

// getById Product

describe('Testando a função `getById` do service ProductService', () => {
  const ID_EXAMPLE = '604cb554311d68f491ba5781';

  describe('quanto não é encontrado um produto para o ID', () => {
    before(() => {
      sinon.stub(ProductModel, 'getById')
        .resolves(null);
    });

    after(() => {
      ProductModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto retornado possui as keys `code` e `message`', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);
      const { err } = response;

      expect(err).to.include.all.keys('code', 'message');
    });

    it('a key `code` do objeto retornado é uma string', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);
      const { err: { code } } = response;

      expect(code).to.be.a('string');
    });

    it('a `string` da key `code` é `invalid_data`', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);
      const { err: { code } } = response;

      expect(code).to.equal('invalid_data');
    });

    it('a key `message` do objeto retornado é uma string', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);
      const { err: { message } } = response;

      expect(message).to.be.a('string');
    });

    it('a string da key `message` é `Wrong id format`', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);
      const { err: { message } } = response;

      expect(message).to.equal('Wrong id format');
    });
  });

  describe('quanto é encontrado um produto para o ID', () => {
    const ProductPayload = {
      _id: '604cb554311d68f491ba5781',
      name: 'Example Product',
      quantity: 1,
    }

    before(() => {
      sinon.stub(ProductModel, 'getById')
        .resolves(ProductPayload);
    });

    after(() => {
      ProductModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto possui as keys `_id`, `name`, e `quantity`', async () => {
      const response = await ProductService.getById(ID_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

// update Product

describe('Testando a função `update` do service ProductService', () => {
  describe('quando o payload informado não é válido', () => {
    describe('o id informado é inválido', () => {
      const payloadProduct = {
        name: 'Product Example',
        quantity: 10,
      }

      const ID_INVALID = '1';

      before(() => {
        sinon.stub(ProductModel, 'update')
          .resolves(null);
      });
  
      after(() => {
        ProductModel.update.restore();
      });

      it('retorna null', async () => {
        const response = await ProductService.update(ID_INVALID, payloadProduct);

        expect(response).to.be.a('object');
      });

    });

    describe('pois o nome é menor que 5 caracteres', () => {
      const payloadProduct = {
        name: 'abc',
        quantity: 10,
      }

      const ID = '613ffccffc43b8f78e54a01f';

      before(() => {
        sinon.stub(ProductModel, 'update')
          .resolves({
            err: {
              code: 'invalid_data',
              message: '"name" length must be at least 5 characters long'
            }
          });
      });
  
      after(() => {
        ProductModel.update.restore();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.update(ID, payloadProduct);

        expect(response).to.be.a('object');
      });

      it('o objeto possui o objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await ProductService.update(ID, payloadProduct);

        expect(err).to.have.property('message');
        expect(err).to.have.property('code');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"name" length must be at least 5 characters long');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade é um valor menor ou igual a 0', async () => {
      const payloadProduct = {
        name: 'abcde',
        quantity: 0,
      }

      const ID = '613ffccffc43b8f78e54a01f';

      before(() => {
        sinon.stub(ProductModel, 'update')
          .resolves({
            err: {
              code: 'invalid_data',
              message: '"name" length must be at least 5 characters long'
            }
          });
      });
  
      after(() => {
        ProductModel.update.restore();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.update(ID, payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await ProductService.update(ID, payloadProduct);

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"quantity" must be larger than or equal to 1');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade não é um número', () => {
      const payloadProduct = {
        name: 'abcdef',
        quantity: '1',
      };

      const ID = '613ffccffc43b8f78e54a01f';

      before(() => {
        sinon.stub(ProductModel, 'update')
          .resolves({
            err: {
              code: 'invalid_data',
              message: '"name" length must be at least 5 characters long'
            }
          });
      });
  
      after(() => {
        ProductModel.update.restore();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.update(ID, payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err } = response;

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"quantity" must be a number');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.update(ID, payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });
  });

  describe('quando é atualizado com sucesso', () => {

    const payloadProduct = {
      name: 'abcdefgh',
      quantity: 1,
    }

    const ID = '613ffccffc43b8f78e54a01f';

    before(() => {
      sinon.stub(ProductModel, 'update')
        .resolves({
          _id: ID,
          name: payloadProduct.name,
          quantity: payloadProduct.quantity,
        });
    });

    after(() => {
      ProductModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.update(ID, payloadProduct);

      expect(response).to.be.a('object');
    });

    it('o objeto possui as keys `_id`, `name` e `quantity`', async () => {
      const payloadProduct = {
        name: 'abcdefghi',
        quantity: 1,
      }
      const response = await ProductService.update(ID, payloadProduct);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

// remove Product
describe('Testando a função `remove` do model ProductService', () => {
  const payloadProduct = {
    name: "Produto do Batista",
    quantity: 100,
  }

  const errorFormat = {
    err: { 
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  }

  const ID_EXAMPLE = '613ffccffc43b8f78e54a01f';

  describe('quando o produto não é removido', () => {
    before(() => {
      sinon.stub(ProductModel, 'remove')
      .resolves(null);
    });

    after(() => {
      ProductModel.remove.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.remove(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto retornado possui o formato correto: `{ err: { code, message } }`', async () => {
      const response = await ProductService.remove(ID_EXAMPLE);

      expect(response.err).to.include.all.keys('code', 'message');
    });
  });

  describe('quando o produto é removido', () => {
    before(() => {
      sinon.stub(ProductModel, 'remove')
      .resolves(
        {
          _id: ID_EXAMPLE,
          name: payloadProduct.name,
          quantity: payloadProduct.quantity,
        }
      );
    });
  
    after(() => {
      ProductModel.remove.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.remove(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto retornado possui as keys `_id`, `name` e `quantity`', async () => {
      const response = await ProductService.remove(ID_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

// create sales

describe('Testando a função `create` do service SalesService', () => {
  const ID_EXAMPLE = '604cb554311d68f491ba5781';

  describe('quando o parâmetro passado não é um array', () => {
    const errFormat = {
      err: {
        code: 'invalid_data',
        message: 'body must be an array',
      }
    }

    const payloadSales = {
      productId:
      '614117088ef1e8004d2e3d7b',
      quantity: 10,
    };

    it('retorna um objeto', async () => {
      const response = await SalesService.create(payloadSales);

      expect(response).to.be.a('object');
    });

    it('o objeto retornado possui um objeto "err" com as chaves "code" e "message"', async () => {
      const { err } = await SalesService.create(payloadSales);

      expect(err).to.have.property('message');
      expect(err).to.have.property('code');
    });

    it('a chave "message" possui a mensagem correta', async () => {
      const response = await SalesService.create(payloadSales);
      const { err: { message } } = response;

      expect(message).to.equal(errFormat.err.message);
    });

    it('a chave "code" deste objeto possui o código correto', async () => {
      const response = await SalesService.create(payloadSales);
      const { err: { code } } = response;

      expect(code).to.equal(errFormat.err.code);
    });
  });

  describe('quando o payload informado não é válido', () => {
    const errFormat = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    }

    before(() => {
      sinon.stub(SalesSchema, 'validate')
        .resolves(errFormat);
    });

    after(() => {
      SalesSchema.validate.restore();
    });

    describe('a quantidade é menor que 0', () => {
      const errFormat = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }

      const payloadSales = [{
        productId: '614117088ef1e8004d2e3d7b',
        quantity: -10,
      }];

      it('retorna um objeto', async () => {
        const response = await SalesService.create(payloadSales);

        expect(response).to.be.a('object');
      });

      it('o objeto retornado possui um objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await SalesService.create(payloadSales);

        expect(err).to.have.property('message');
        expect(err).to.have.property('code');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await SalesService.create(payloadSales);
        const { err: { message } } = response;

        expect(message).to.equal(errFormat.err.message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await SalesService.create(payloadSales);
        const { err: { code } } = response;

        expect(code).to.equal(errFormat.err.code);
      });
    });

    describe('a quantidade é igual a 0', async () => {
      const errFormat = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }

      const payloadSales = [{
        productId: '614117088ef1e8004d2e3d7b',
        quantity: 0,
      }]

      it('retorna um objeto', async () => {
        const response = await SalesService.create(payloadSales);

        expect(response).to.be.a('object');
      });

      it('o objeto retornado possui um objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await SalesService.create(payloadSales);

        expect(err).to.have.property('message');
        expect(err).to.have.property('code');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await SalesService.create(payloadSales);
        const { err: { message } } = response;

        expect(message).to.equal(errFormat.err.message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await SalesService.create(payloadSales);
        const { err: { code } } = response;

        expect(code).to.equal(errFormat.err.code);
      });
    });

    describe('a quantidade não é um número', () => {
      const errFormat = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }

      const payloadSales = [{
        productId: '614117088ef1e8004d2e3d7b',
        quantity: '0',
      }];

      it('retorna um objeto', async () => {
        const response = await SalesService.create(payloadSales);

        expect(response).to.be.a('object');
      });

      it('o objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await SalesService.create(payloadSales);
        const { err } = response;

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await SalesService.create(payloadSales);
        const { err: { message } } = response;

        expect(message).to.equal(errFormat.err.message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await SalesService.create(payloadSales);
        const { err: { code } } = response;

        expect(code).to.equal(errFormat.err.code);
      });
    });

  });

  describe('quando é inserido com sucesso', () => {

    const payloadSales = [{
      productId: '614117088ef1e8004d2e3d7b',
      quantity: 100,
    }];

    const ID_EXAMPLE = '604cb554311d68f491ba5781';
    
    before(() => {

      sinon.stub(SalesModel, 'create')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: [
            {
              productId: payloadSales.productId,
              quantity: payloadSales.quantity,
            },
          ],
        });

      sinon.stub(SalesSchema, 'validate')
        .resolves({});
    });

    after(() => {
      SalesModel.create.restore();
      SalesSchema.validate.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.create(payloadSales);

      expect(response).to.be.a('object');
    });

    it('o objeto retornado possui as keys `_id` e `itensSold`', async () => {
      const response = await SalesService.create(payloadSales);

      expect(response).to.include.all.keys('_id', 'itensSold');
    });

    it('a key `itensSold` é um array não vazio', async () => {
      const { itensSold } = await SalesService.create(payloadSales);

      expect(itensSold).to.be.an('array').that.is.not.empty;
    });

    it('os objetos da key `itensSold` possui as keys `productId` e `quantity`', async () => {
      const { itensSold } = await SalesService.create(payloadSales);

      expect(itensSold[0]).to.include.all.keys('productId', 'quantity');
    });

  });
});

// getAll SALES

describe('Testando a função getAll do service SalesService' ,() => {
  describe('quanto não existe nenhuma venda cadastrada' ,() => {
    before(() => {
      sinon.stub(SalesModel, 'getAll')
        .resolves({sales: []});
    });

    after(() => {
      SalesModel.getAll.restore();
    });

    it('retorna o object "sales" contento um array', async () => {
      const response = await SalesService.getAll();
      const { sales } = response;

      expect(sales).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await SalesService.getAll();
      const { sales } = response;

      expect(sales).to.be.empty;
    });
  });

  describe('quanto existem produtos cadastrados' ,() => {
    before(() => {
      sinon.stub(SalesModel, 'getAll')
        .resolves({
          sales: [
            {
              _id: '804cb554311d68f491ba5791',
              itensSold: [
                {
                  productId: '604cb554311d68f491ba5781',
                  quantity: 1,
                }
              ]
            },
          ]
      });
    });

    it('retorna o object "sales" contento um array', async () => {
      const response = await SalesService.getAll();
      const { sales } = response;

      expect(sales).to.be.an('array');
    });

    it('o array retornado não está vazio', async () => {
      const response = await SalesService.getAll();
      const { sales } = response;

      expect(sales).to.not.be.empty;
    });

    it('o array retornado possui dados do tipo objeto', async () => {
      const response = await SalesService.getAll();
      const { sales } = response;
      const  [firstSales] = sales;

      expect(firstSales).to.be.an('object');
    });

    it('todos os objetos possuem os atributos "id" e "itensSold"', async () => {
      const response = await SalesService.getAll();
      const { sales } = response;
      const  [firstSales] = sales;

      expect(firstSales).to.include.all.keys('_id', 'itensSold');
    });
  });
});

// getById Sales

describe.only('Testando a função `getById` do service SalesService', () => {
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const ERROR = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  }

  describe('quanto não é encontrado uma venda para o ID', () => {
    before(() => {
      sinon.stub(SalesModel, 'getById')
        .resolves(null);
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto retornado possui as keys `code` e `message`', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);
      const { err } = response;

      expect(err).to.include.all.keys('code', 'message');
    });

    it('a key `code` do objeto retornado é uma string', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);
      const { err: { code } } = response;

      expect(code).to.be.a('string');
    });

    it('a `string` da key `code` é `not_found`', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);
      const { err: { code } } = response;

      expect(code).to.equal(ERROR.err.code);
    });

    it('a key `message` do objeto retornado é uma string', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);
      const { err: { message } } = response;

      expect(message).to.be.a('string');
    });

    it('a string da key `message` é `Sale not found`', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);
      const { err: { message } } = response;

      expect(message).to.equal(ERROR.err.message);
    });
  });

  describe('quanto é encontrado uma venda para o ID', () => {
    const SalesPayload = {
      _id: ID_EXAMPLE,
      itensSold: [
        {
          productId: '904cb554311d68f491ba5782',
          quantity: 1,
        },
      ],
    };

    before(() => {
      sinon.stub(SalesModel, 'getById')
        .resolves(SalesPayload);
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto possui as keys `_id` e `itensSold`', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'itensSold');
    });

    it('a key `itensSold` é um array não vazio', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);

      const { itensSold } = response;

     expect(itensSold).to.be.an('array').that.is.not.empty;
    });

    it('os elementos do array `itensSold` possuem as keys `productId` e `quantity`', async () => {
      const response = await SalesService.getById(ID_EXAMPLE);

      const { itensSold } = response;

      const [firstElementArrayItensSold] = itensSold;

      expect(firstElementArrayItensSold).to.include.all.keys('productId', 'quantity');
    });
  });
});