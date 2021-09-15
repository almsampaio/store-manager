const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');


let connectionMock;

before(async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();

  connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('StoreManager'));

  sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
});

/* Restauraremos a função `getConnection` original após os testes. */
after(() => {
  mongoConnection.getConnection.restore();
});

describe('Testa se o nome do banco é StorageManager', () => {
  it('the connect goes correctly', async () => {
    const connectionDone = await mongoConnection.getConnection();
    const dbName = connectionDone.databaseName;
    expect(dbName).to.be.eq('StoreManager');
  });
})


describe('Products', () => {
  describe('Insere um novo produto no BD', () => {
    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await ProductModel.createProduct('Flavio', 8000);

        expect(response).to.be.a('object')
      });

      it('tal objeto possui as chaves _id, name e quantity', async () => {
        const response = await ProductModel.createProduct('Flavio', 8000);

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('testa a busca de produtos pelo nome', () => {
    it('quando retorna o nome correto', async () => {
      await ProductModel.createProduct('Flavio', 8000);
      const { name } = await ProductModel.getProductByName('Flavio');
      expect(name).to.be.equal('Flavio');
    });
  });

  describe('Testa funcao updateProduct', () => {
    it('testa se atualizou', async () => {
      const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
      await ProductModel.updateProduct(id, 'Jao', 5);
      const { quantity } = await ProductModel.getProductById(id);
      expect(quantity).to.be.equal(5);
    });
  });

  describe('testa funcao delete', () => {
    it('testa se deleta corretamente', async () => {
      const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
      await ProductModel.deleteProduct(id);
      const response = await ProductModel.getProductById(id);

      expect(response).to.be.equal(null);

    })
  });


  describe('Obtem lista completa de produtos, getAll()', () => {
    it('retorna um array', async () => {
      const response = await ProductModel.getAll();

      expect(response).to.be.a('array')
    });

    it('tal objeto possui as chaves _id, name e quantity', async () => {
      const [response] = await ProductModel.getAll();

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });

  describe('Obtem produtos por id, getProductById()', () => {
    describe('Quando o id não é válido', () => {
      it('retorna null', async () => {
        const response = await ProductModel.getProductById('123');

        expect(response).to.be.equal(null);
      });
    });
    describe('Quando o id é válido', () => {
      it('retorna um objeto', async () => {
        const { _id: id } = await ProductModel.createProduct('Flavio', 8000);

        const response = await ProductModel.getProductById(id);

        expect(response).to.be.a('object');
      });
    });
  });
});

describe('Sales', () => {
  describe('Insere uma nova venda no BD', () => {
    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
        const sales = [{"productId": id, "quantity": 1}]
        const response = await SalesModel.registerSales(sales);

        expect(response).to.be.a('object')
      });

      it('tal objeto possui a chave itensSold', async () => {
        const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
        const sales = [{"productId": id, "quantity": 1}]
        const response = await SalesModel.registerSales(sales);

        expect(response).to.have.a.property('itensSold');
      });
    });
  });

  describe('Obtem lista completa de vendas, getAll()', () => {
    it('retorna um array', async () => {
      const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
      const sales = [{"productId": id, "quantity": 1}]
      const response = await SalesModel.getAll();

      expect(response).to.be.a('array')
    });
  });

  describe('Obtem vendas por id, getSaleById()', () => {
    describe('Quando o id não é válido', () => {
      it('retorna null', async () => {
        const response = await SalesModel.getSaleById('123');

        expect(response).to.be.equal(null);
      });
    });
    describe('Quando o id é válido', () => {
      it('retorna um objeto', async () => {
        const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
        const arraySales = [{"productId": id, "quantity": 1}]
        const { _id: saleId } = await SalesModel.registerSales(arraySales);
        const response = await SalesModel.getSaleById(saleId);

        expect(response).to.be.a('object');
      });
    });
  });

  describe('deleteSale', () => {
    it('quando o id e valido, expera-se que o sale e deletado', async () => {
      const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
      const arraySales = [{"productId": id, "quantity": 1}]
      const { _id: saleId } = await SalesModel.registerSales(arraySales);

      await SalesModel.deleteSale(saleId);

      const response = await SalesModel.getSaleById(saleId);

      expect(response).to.be.equal(null);
    });
  });

  describe('updateSale', () => {
    it('quando o id e invalido, retorna null', async () => {
      const response = await SalesModel.updateSale('123');

      expect(response).to.be.equal(null);
    });

    it('quando o id e valido, retorn um objeto', async () => {
      const { _id: id } = await ProductModel.createProduct('Flavio', 8000);
      const arraySales = [{"productId": id, "quantity": 1}]
      const { _id: saleId } = await SalesModel.registerSales(arraySales);
      const newArraySales = [{"productId": id, "quantity": 2}]

      await SalesModel.updateSale(saleId, newArraySales);

      const { itensSold } = await SalesModel.getSaleById(saleId);
      const { quantity } = itensSold[0];

      expect(quantity).to.be.equal(2);
    });
  });
});
