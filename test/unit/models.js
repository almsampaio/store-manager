const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const Model = require('../../models');
const getConnection = require('./mockConnection');

const DB_NAME = 'StoreManager';
const collectionProducts = 'products';
const collectionSales = 'sales';
const EXAMPLE_ID = '5f43a7ca92d58904914656b6';


describe('Cadastro de um novo produto', () => {
  describe('quando é adicionado com sucesso', () => {
    const payload = {
      name: 'Testy, the Tester',
      quantity: 30,
    };

    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.products.additionProduct(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.products.getProducts();

      expect(response.products).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const payload = { 
      name: 'Testy, the Tester', 
      quantity: 30,
    };

    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      await mockConnection.db(DB_NAME).collection(collectionProducts).insertOne(payload);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('de objetos', async () => {
      const response = await Model.products.getProducts();

      expect(response.products[0]).to.be.an('object');

      expect(response.products[0]).to.have.property('_id');
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {
  describe('quando não encontrado', () => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null', async () => {
      const response = await Model.products.productById(EXAMPLE_ID);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrado', () => {
    it('o retorno é um objeto com as informações do produto', async () => {
      const payload = { 
        name: 'Testy, the Tester',
        quantity: 30,
      };

      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      const { insertedId } = await mockConnection.db(DB_NAME).collection(collectionProducts).insertOne(payload);

      const response = await Model.products.productById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de um produto', () => {
  const payload = { 
  name: 'Testy, the Tester',
  quantity: 30,
};

  describe('quando não encontra o produto', () => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "matchedCount" com valor 0', async () => {
      const response = await Model.products.updateProduct(EXAMPLE_ID, payload);

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const payloadUpdated = { 
      name: 'Testy, the Tester',
      quantity: 45,
    };

    it('atualiza o produto e retorna um objeto com "modifiedCount" com valor 1', async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      const { insertedId } = await mockConnection.db(DB_NAME).collection(collectionProducts).insertOne(payload);

      const response = await Model.products.updateProduct(insertedId, payloadUpdated);

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta um produto cadastrado', () => {
  describe('quando não encontrado', () => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "deletedCount" com valor 0', async () => {
      const response = await Model.products.deleteProduct(EXAMPLE_ID);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const payload = { 
      name: 'Testy, the Tester',
      quantity: 45,
    };

    it('deleta o produto e retorna um objeto com "deletedCount" com valor 1', async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      const { insertedId } = await mockConnection.db(DB_NAME).collection(collectionProducts).insertOne(payload);

      const response = await Model.products.deleteProduct(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Cadastro de uma nova venda', () => {
  describe('quando uma venda de um produto é adicionada com sucesso', () => {
    const payload = [{ productId: EXAMPLE_ID, quantity: 3 }];

    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.have.property('_id');
    });
  });

  describe('quando uma venda de dois produtos é adicionada com sucesso', () => {
    const payload = [
      { productId: EXAMPLE_ID, quantity: 3 }, 
      { productId: EXAMPLE_ID, quantity: 7 },
    ];

    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de vendas', () => {
  describe('quando não tem nenhuma cadastrada',() => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.sales.getSales();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.sales.getSales();

      expect(response.sales).to.be.empty;
    });
  });

  describe('quando tem vendas cadastradas', () => {
    const payload = [{ 
      productId: EXAMPLE_ID,
      quantity: 3,
    }];

    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      await mockConnection.db(DB_NAME).collection(collectionSales).insertOne({ itensSold: payload });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.sales.getSales();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('de objetos', async () => {
      const response = await Model.sales.getSales();

      expect(response.sales[0]).to.be.an('object');

      expect(response.sales[0]).to.have.property('_id');
    });
  });
});

describe('Carrega uma venda cadastrada pela "_id"', () => {
  describe('quando não encontrada', () => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null', async () => {
      const response = await Model.sales.saleById(EXAMPLE_ID);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrada', () => {
    it('o retorno é um objeto com as informações dos produtos', async () => {
      const payload = [{ 
        productId: EXAMPLE_ID,
        quantity: 3,
      }];

      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      const { insertedId } = await mockConnection.db(DB_NAME).collection(collectionSales).insertOne({ itensSold: payload });

      const response = await Model.sales.saleById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('itensSold');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de uma venda', () => {
  const payload = [{ 
    productId: EXAMPLE_ID,
    quantity: 3,
  }];

  describe('quando não encontra a venda', () => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "matchedCount" com valor 0', async () => {
      const response = await Model.sales.updateSale(EXAMPLE_ID, { itensSold: payload });

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const updatedPayload = [{ 
      productId: EXAMPLE_ID,
      quantity: 7,
    }];

    it('atualiza os produtos vendidos e retorna um objeto com "modifiedCount" com valor 1', async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      const { insertedId } = await mockConnection.db(DB_NAME).collection(collectionSales).insertOne({ itensSold: payload });

      const response = await Model.sales.updateSale(insertedId, { itensSold: updatedPayload });

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta uma venda cadastrada', () => {
  describe('quando não encontrada', () => {
    before(async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "deletedCount" com valor 0', async () => {
      const response = await Model.sales.deleteSale(EXAMPLE_ID);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const payload = [{ 
      productId: EXAMPLE_ID,
      quantity: 3,
    }];

    it('deleta a venda e retorna um objeto com "deletedCount" com valor 1', async () => {
      const mockConnection = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(mockConnection);

      const { insertedId } = await mockConnection.db(DB_NAME)
        .collection(collectionSales).insertOne({ itensSold: payload });

      const response = await Model.sales.deleteSale(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});