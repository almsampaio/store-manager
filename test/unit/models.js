const sinon = require('sinon')
const { expect } = require('chai')
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connection = require('../../models/connection')
const ProductModel = require('../../models/Product')
const SaleModel = require('../../models/Sale')

const DB_NAME = 'StoreManager';

describe('Insere um novo produto no Product BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct)

      expect(response).to.be.a('object')
    })

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductModel.create(payloadProduct)

      expect(response).to.have.a.property('_id')
    })
  });
});

describe('Busca por produtos no Product BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando busca por todos retorna um array', () => {
    it('retorna um array', async () => {
      const response = await ProductModel.getAll()

      expect(response).to.be.an('array')
    })
  });

  describe('quando busca por id retorna o produto daquele id', () => {
    it('retorna o produto', async () => {
      const { _id } = await ProductModel.create(payloadProduct);
      const response = await ProductModel.getById(_id)

      expect(response).to.have.property('_id')
      expect(response).to.have.property('name')
      expect(response).to.have.property('quantity')
    })
  });
});

describe('Atualiza um produto no Product BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é atualizado com sucesso', () => {
    it('retorna um objeto', async () => {
      const responseCreate = await ProductModel.create(payloadProduct)
      const responseUpdate = await ProductModel.update({
        ...payloadProduct,
        id: responseCreate._id
      })

      expect(responseUpdate).to.be.a('object')
    })
  });
});

describe('Deleta um produto no Product BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é deletado com sucesso', () => {
    it('retorna um objeto', async () => {
      const responseCreate = await ProductModel.create(payloadProduct)
      const responseUpdate = await ProductModel.deleteById(responseCreate._id)

      expect(responseUpdate).to.be.a('object')
    })
  });
});

describe('Insere um novo produto no Sale BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example product',
    quantity: 2
  }


  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const product = await ProductModel.create(payloadProduct)
      const payloadSale = [
        {
          productId: product.id,
          quantity: 2
        }
      ]
      const response = await SaleModel.create(payloadSale)

      expect(response).to.be.a('object')
    })

    it('tal objeto possui o "id" da nova venda inserido', async () => {
      const product = await ProductModel.create(payloadProduct)
      const payloadSale = [
        {
          productId: product.id,
          quantity: 2
        }
      ]
      const response = await SaleModel.create(payloadSale)

      expect(response).to.have.a.property('_id')
    })
  });
});

describe('Busca por produtos no Sale BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando busca por todos retorna um array', () => {
    it('retorna um array', async () => {
      const response = await SaleModel.getAll()

      expect(response).to.be.an('array')
    })
  });

  describe('quando busca por id retorna o produto daquele id', () => {
    it('retorna a sale', async () => {
      const { _id } = await ProductModel.create(payloadProduct);
      const { _id: saleId } = await SaleModel.create([
        {
          productId: _id,
          quantity: 2
        }
      ]);
      const response = await SaleModel.getById(saleId)

      expect(response).to.have.property('_id')
      expect(response).to.have.property('itensSold')
    })
  });
});

describe('Atualiza um produto no Sale BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é atualizado com sucesso', () => {
    it('retorna um objeto', async () => {
      const responseProductCreate = await ProductModel.create(payloadProduct)
      const responseSaleCreate = await SaleModel.create([
        {
          productId: responseProductCreate._id,
          quantity: 2
        }
      ])
      const responseUpdate = await SaleModel.update({
        itensSold: [...responseSaleCreate.itensSold],
        id: responseSaleCreate._id
      })

      expect(responseUpdate).to.be.a('object')
    })
  });
});

describe('Deleta uma sale no Product BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é deletado com sucesso', () => {
    it('retorna um objeto', async () => {
      const responseProductCreate = await ProductModel.create(payloadProduct)
      const responseSaleCreate = await SaleModel.create([
        {
          productId: responseProductCreate._id,
          quantity: responseProductCreate.quantity
        }
      ])
      const responseUpdate = await SaleModel.deleteById(responseSaleCreate._id)

      expect(responseUpdate).to.be.a('object')
    })
  });
});
