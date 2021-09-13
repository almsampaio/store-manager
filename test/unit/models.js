const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModel = require('../../models/productModel');

describe('#01 Insere novo produto no BD', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock; 
  const payloadProduct = {
    name: 'Produto Silva',
    quantity: 10,
  }

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('É inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await productModel.create(payloadProduct);

      expect(response).to.be.a('object')
    })
    it('O objeto retornado possui o id do produto adicionado', async () => {
      const response = await productModel.create(payloadProduct);

      expect(response).to.have.a.property('id')
    })
    it('deve existir um produto como nome cadastrado', async () => {
      await productModel.create(payloadProduct);
      const createdProduct = await connectionMock.collection('products').findOne({ name: payloadProduct.name });
      expect(createdProduct).to.be.not.null;
    });
  })
})

describe('#02 pesquisa produtos no Banco de dados', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock; 
  const payloadProduct = {
    name: 'Produto Silva',
    quantity: 10,
  }
  let insertedId;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
    const response = await productModel.create(payloadProduct);
    insertedId = response.id;
    console.log(`adiconoado produto no bd ${response}`)
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Pesquisa por uma lista de produtos', () => {
    it('Retorna um array', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.a('array')
    })
    it('O objeto retornado dentro do array possui propriedade id', async () => {
      const response = await productModel.getAll();

      expect(response[0]).to.have.a.property('_id')
    })
  })
  describe('Pesquisa por um id específico', () => {
    it('Retorna um array', async () => {
      const response = await productModel.getById(insertedId);

      expect(response).to.be.a('array')
    })
    it('O array retornado possui apenas 1 objeto', async () => {
      const response = await productModel.getById(insertedId);

      expect(response.length).to.be(1)
    })
    it('O objeto retornado dentro do array possui propriedade id', async () => {
      const response = await productModel.getById(insertedId);

      expect(response[0]).to.have.a.property('id')
    })
  })
})

describe('#03 Faz o update no banco de dados', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock; 
  const payloadProduct = {
    name: 'Produto Silva',
    quantity: 10,
  }
  const updateProduct = {
    name: 'Produto Geral',
    quantity: 8,
  }
  let insertedId;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
    const response = await productModel.create(payloadProduct);
    insertedId = response.id;
    console.log(`adiconoado produto no bd ${response}`)
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Faz o update de um produto pelo id', () => {
    it('Retorna um objeto', async () => {
      const response = await productModel.update(insertedId, updateProduct);

      expect(response).to.be.a('object')
    })
    it('O objeto retornado possui propriedade ok com valor 1', async () => {
      const response = await productModel.update(insertedId, updateProduct);

      expect(response.result.ok).to.be(1)
    })
    it('deve existir um produto como nome cadastrado', async () => {
      const updatedProduct = await connectionMock.collection('products').findOne({ name: updateProduct.name });
      expect(updatedProduct).to.be.not.null;
    });
  })
})

describe('#04 deleta um produto do banco de dados', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock; 
  const payloadProduct = {
    name: 'Produto Silva',
    quantity: 10,
  }
  const updateProduct = {
    name: 'Produto Geral',
    quantity: 8,
  }
  let insertedId;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
    const response = await productModel.create(payloadProduct);
    insertedId = response.id;
    console.log(`adiconoado produto no bd ${response}`)
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Deleta um produto pelo id', () => {
    it('Retorna um objeto', async () => {
      const response = await productModel.deleteById(insertedId);

      expect(response).to.be.a('object')
    })
    it('O objeto retornado possui propriedade ok com valor 1', async () => {
      const response = await productModel.deleteById(insertedId);

      expect(response.result.ok).to.be(1)
    })
    it('Não deve existir um produto como nome cadastrado', async () => {
      const updatedProduct = await connectionMock.collection('products').findOne({ name: updateProduct.name });
      expect(updatedProduct).to.be.null;
    });
  })
})