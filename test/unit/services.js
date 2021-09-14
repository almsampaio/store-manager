const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');

const ProductModel = require('../../models/ProductModel');
const ProductService = require('../../services/ProductService');

// CREATE PRODUCT
describe('Testando a função `create` do service ProductService', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(DB_NAME));
  
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

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
        await ProductService.create(payloadProduct);
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

    const payloadProduct = {
      name: 'abcdefgh',
      quantity: 1,
    }

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const payloadProduct = {
        name: 'abcdefghi',
        quantity: 1,
      }
      const response = await ProductService.create(payloadProduct);

      expect(response).to.have.a.property('_id');
    });

    it('deve existir um produto com o nome e a quantidade cadastrada', async () => {
      await ProductService.create(payloadProduct);

      const movieCreated = await connectionMock.collection('products').findOne({name: payloadProduct.name, quantity: payloadProduct.quantity});

      expect(movieCreated).to.deep.include(payloadProduct);
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

describe.only('Testando a função `update` do service ProductService', () => {
  let connectionMock;
  let id;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(DB_NAME));
  
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quando o payload informado não é válido', () => {
    describe('pois o nome não atente aos requisitos', () => {
      const payloadProduct = {
        name: 'abc',
        quantity: 10,
      }

      before(async () => {
        const { insertedId } = await connectionMock.collection('products').insertOne(payloadProduct);
        id = insertedId;
      });
  
      after(async () => {
        await connectionMock.collection('products').drop();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.update(id, payloadProduct);

        expect(response).to.be.a('object');
      });

      it('o objeto possui o objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await ProductService.update(id, payloadProduct);

        expect(err).to.have.property('message');
        expect(err).to.have.property('code');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"name" length must be at least 5 characters long');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade é um valor menor ou igual a 0', async () => {
      const payloadProduct = {
        name: 'abcde',
        quantity: 0,
      }

      before(async () => {
        const { insertedId } = await connectionMock.collection('products').insertOne(payloadProduct);
        id = insertedId;
      });
  
      after(async () => {
        await connectionMock.collection('products').drop();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.update(id, payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const { err } = await ProductService.update(id, payloadProduct);

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"quantity" must be larger than or equal to 1');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade não é um número', () => {
      const payloadProduct = {
        name: 'abcdef',
        quantity: '1',
      }

      before(async () => {
        const { insertedId } = await connectionMock.collection('products').insertOne(payloadProduct);
        id = insertedId;
      });
  
      after(async () => {
        await connectionMock.collection('products').drop();
      });

      it('retorna um objeto', async () => {
        const response = await ProductService.update(id, payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err } = response;

        expect(err).to.have.property('code');
        expect(err).to.have.property('message');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('"quantity" must be a number');
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.update(id, payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('invalid_data');
      });
    });
  });

  describe('quando é inserido com sucesso', () => {

    const payloadProduct = {
      name: 'abcdefgh',
      quantity: 1,
    }

    before(async () => {
      const { insertedId } = await connectionMock.collection('products').insertOne(payloadProduct);
      id = insertedId;
    });

    after(async () => {
      await connectionMock.collection('products').drop();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.update(id, payloadProduct);

      expect(response).to.be.a('object');
    });

    it('o objeto possui as keys `_id`, `name` e `quantity`', async () => {
      const payloadProduct = {
        name: 'abcdefghi',
        quantity: 1,
      }
      const response = await ProductService.update(id, payloadProduct);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });

    // it('deve existir um produto com o nome e a quantidade cadastrada', async () => {
    //   await ProductService.update(id, payloadProduct);

    //   const movieCreated = await connectionMock.collection('products').findOne({name: payloadProduct.name, quantity: payloadProduct.quantity});

    //   expect(movieCreated).to.deep.include(payloadProduct);
    // });
  });
});