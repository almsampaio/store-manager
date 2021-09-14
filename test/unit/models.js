const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const getConnection = require('./connectionMock');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const { after, before } = require('mocha');

describe('Testando productsModel', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();

    await connectionMock.db('StoreManager').collection('products').deleteMany({});
  });
  describe('Testa a inserção de produtos no banco de dados', () => {
    describe('Quando é inserido com sucesso', () => {
      let response;

      before(async () => {
        response = await productsModel.add('Produto do Batista', 100);
      });

      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('possui as chaves "_id", "name", "quantity"', () => {
        expect(response).to.include.keys('_id', 'name', 'quantity');
      });

      it('"name" deve ser uma string com mais de 5 caracteres', () => {
        const { name } = response;

        expect(name).to.be.a('string');
        expect(name.length).to.be.greaterThanOrEqual(5);
      });

      it('"quantity" deve ser um número maior que 0', () => {
        const { quantity } = response;

        expect(quantity).to.be.a('number');
        expect(quantity).to.be.greaterThan(0);
      });
    });

    describe('Quando há falha na inserção', () => {
      let response;

      before(async () => {
        response = await productsModel.add('Produto', 100);
      });

      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      describe('Quando o produto já existe no banco', () => {
        it('Deve retornar null', async () => {
          const duplicityResponse = await productsModel.add('Produto', 100);

          expect(duplicityResponse).to.be.null;
        });
      });
    });
  });

  describe('Testa a leitura dos produtos no banco de dados', () => {
    describe('Quando a leitura é feita com sucesso', () => {
      let response;

      before(async () => {
        response = await productsModel.getAll();
      });

      it('O resultado deve ser um array', () => {
        expect(response).to.be.a('array');
      });

      it('O resultado deve ser um array que contenha apenas objetos', () => {
        response.forEach((product) => expect(product).to.be.a('object'));
      });
    });
  });

  describe('Testa a busca de produtos por id', () => {
    describe('Quando a busca é feita com sucesso', () => {
      let response;

      before(async () => {
        response = await productsModel.add('Produto', 100);
      });

      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      it('O resultado deve ser um objeto', async () => {
        const foundProduct = await productsModel.getById(response._id);

        expect(foundProduct).to.be.a('object');
      });

      it('O resultado deve conter as chaves "_id", "name", "quantity"', async () => {
        const foundProduct = await productsModel.getById(response._id);

        expect(foundProduct).to.include.all.keys('_id', 'name', 'quantity');
      });

      describe('Quando há falha na busca por id', () => {
        describe('Quando o produto não existe', () => {
          it('deve-se retornar null', async () => {
            const inexistentId = 999999;
            const foundProduct = await productsModel.getById(inexistentId);

            expect(foundProduct).to.be.null;
          });
        });
      });
    });
  });

  describe('Testa a atualização de produtos', async () => {
    let productToBeUpdated;

    before(async () => {
      productToBeUpdated = await productsModel.add('Produto', 100);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('Quando a atualização é realizada com sucesso', () => {
      it('O retorno deve ter as caracteristicas desejadas', async () => {
        await productsModel.update(productToBeUpdated._id, 'Atualizou!', 999);
        const updatedProduct = await productsModel.getById(productToBeUpdated._id);

        expect(updatedProduct.name).to.be.equal('Atualizou!');
        expect(updatedProduct.quantity).to.be.equal(999);
      });
    });

    describe('Quando há erro na atualização', () => {
      it('Deve-se retornar null', async () => {
        const invalidId = '111';
        const updatedProduct = await productsModel.update(invalidId, '', 0);

        expect(updatedProduct).to.be.null;
      });
    });
  });

  describe('Testa a deleção de produtos', () => {
    describe('Quando a deleção é realizada com sucesso', () => {
      let productToBeDeleted;
      before(async () => {
        productToBeDeleted = await productsModel.add('Produto', 100);
      });

      it('Deve retornar um array', async () => {
        await productsModel.remove(productToBeDeleted._id);

        const products = await productsModel.getAll();

        expect(products).to.be.a('array');
      });

      it('O array deve estar vazio', async () => {
        await productsModel.remove(productToBeDeleted._id);

        const products = await productsModel.getAll();

        expect(products.length).to.be.equal(0);
      });
    });

    describe('Quando há erro na deleção', () => {
      describe('Quando o produto não existe', () => {
        it('Deve-se retornar null', async () => {
          const invalidId = 999;
          const deletedProduct = await productsModel.remove(invalidId);

          expect(deletedProduct).to.be.null;
        });
      });
    });
  });
});
describe('Testando salesModel', () => {
  let connectionMock;
  let existentProduct;

  before(async () => {
    connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    existentProduct = await productsModel.add('Produto teste', 100);
  });

  after(async () => {
    MongoClient.connect.restore();

    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
  });

  describe('Testando a inserção de compras', () => {
    describe('testa a inserçao de um produto existente', () => {
      
      it('deve-se retornar um objeto', async () => {
        const insertedSale = await salesModel.add([{ productId: existentProduct._id, quantity: 10 }]);
        
        expect(insertedSale).to.be.a('object');
      });

      it('o objeto retornado deve possuir as chaves "_id", "itensSold"', async () => {
        const insertedSale = await salesModel.add([{ productId: existentProduct._id, quantity: 10 }]);
        
        expect(insertedSale).to.include.all.keys('_id', 'itensSold');
      });
    });
  });
});
