const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const COLLECTION_P = 'products';
const COLLECTION_S = 'sales';

const Model = require('../../models');
const getConnection = require('./mock');

const ID_EXAMPLE = '604cb554311d68f491ba5781';

// TESTES PRODUCTS

describe('Cadastro de um novo produto', () => {
  describe('quando é adicionado com sucesso', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.products.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.products.create(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.products.getAll();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.products.getAll();

      expect(response.products).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.products.getAll();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('de objetos', async () => {
      const response = await Model.products.getAll();

      expect(response.products[0]).to.be.an('object');

      expect(response.products[0]).to.have.property('_id');
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {
  describe('quando não encontrado', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null', async () => {
      const response = await Model.products.getById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrado', () => {
    it('o retorno é um objeto com as informações do produto', async () => {
      const payload = { name: 'Testy, the Tester', quantity: 30 };

      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response = await Model.products.getById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de um produto', () => {
  const payload = { name: 'Testy, the Tester', quantity: 30 };

  describe('quando não encontra o produto', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "matchedCount" com valor 0', async () => {
      const response = await Model.products.update(ID_EXAMPLE, payload);

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const updatedPayload = { name: 'Testy, the Tester', quantity: 45 };

    it('atualiza o produto e retorna um objeto com "modifiedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response = await Model.products.update(insertedId, updatedPayload);

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta um produto cadastrado', () => {
  describe('quando não encontrado', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "deletedCount" com valor 0', async () => {
      const response = await Model.products.exclude(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const payload = { name: 'Testy, the Tester', quantity: 45 };

    it('deleta o produto e retorna um objeto com "deletedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response = await Model.products.exclude(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

/**  
 * *  * * * TESTES SALES  * * * *
*/

describe('Cadastro de uma nova venda', () => {
  describe('quando uma venda de um produto é adicionada com sucesso', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.sales.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.sales.create(payload);

      expect(response).to.have.property('_id');
    });
  });

  describe('quando uma venda de dois produtos é adicionada com sucesso', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }, { productId: ID_EXAMPLE, quantity: 7 }];

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.sales.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.sales.create(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de vendas', () => {
  describe('quando não tem nenhuma cadastrada',() => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.sales.getAll();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.sales.getAll();

      expect(response.sales).to.be.empty;
    });
  });

  describe('quando tem vendas cadastradas', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.sales.getAll();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('de objetos', async () => {
      const response = await Model.sales.getAll();

      expect(response.sales[0]).to.be.an('object');

      expect(response.sales[0]).to.have.property('_id');
    });
  });
});

describe('Carrega uma venda cadastrada pela "_id"', () => {
  describe('quando não encontrada', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null', async () => {
      const response = await Model.sales.getById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrada', () => {
    it('o retorno é um objeto com as informações dos produtos', async () => {
      const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response = await Model.sales.getById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('itensSold');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de uma venda', () => {
  const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

  describe('quando não encontra a venda', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "matchedCount" com valor 0', async () => {
      const response = await Model.sales.update(ID_EXAMPLE, { itensSold: payload });

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const updatedPayload = [{ productId: ID_EXAMPLE, quantity: 7 }];

    it('atualiza os produtos vendidos e retorna um objeto com "modifiedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response = await Model.sales.update(insertedId, { itensSold: updatedPayload });

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta uma venda cadastrada', () => {
  describe('quando não encontrada', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "deletedCount" com valor 0', async () => {
      const response = await Model.sales.exclude(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    it('deleta a venda e retorna um objeto com "deletedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME)
        .collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response = await Model.sales.exclude(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});