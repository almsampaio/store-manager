const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');

const uriConnection = require('./unitConnection');
const products = require('../../models/products');
const sales = require('../../models/sales');

describe('Test url create "products"', () => {
  let connect;
  const fakeProduct = { name: 'Im a fake product', quantity: 10 };
  const anotherProduct = { name: 'Im another product', quantity: 10 };

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('result of create products', () => {
    it('must have to be an product', () => products.create(fakeProduct)
        .then((res) => expect(res).to.be.an('object')));

    it('products must have props: id, name, quantity', () => products.create(anotherProduct)
        .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('test URL getAll "products"', () => {
  let connect;
  const fakeProduct = { name: 'Im a fake product', quantity: 10 };

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('no data on DB', () => {
    it('must have to be an array', () => products.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('no data on array', () => products.getAll()
      .then((res) => expect(res).to.be.empty));
  });

  describe('db with data', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne(fakeProduct);
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('must have to an array', () => products.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array with data', () => products.getAll()
      .then((res) => expect(res).to.not.be.empty));

    it('data array must have objects', () => products.getAll()
      .then(([item]) => expect(item).to.be.an('object')));

    it('object must have props: id, name, quantity', () => products.getAll()
      .then(([item]) => expect(item).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Test url getByID "products"', () => {
  let connect;
  const fakeID = ObjectID('610007c2604ebb2c6bf20453');
  const productFakeID = { _id: fakeID, name: 'Im a fake product', quantity: 10 };

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('no data on DB', () => {
    it('returns null', () => products.getById()
      .then((res) => expect(res).to.be.null));
  });

  describe('db with data', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne(productFakeID);
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('must have to be an object', () => products.getById(fakeID)
      .then((res) => expect(res).to.be.an('object')));

    it('object must have props: id, name, quantity', () => products.getById(fakeID)
      .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Test url update "products"', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const fakeProduct = { name: 'Im a fake product', quantity: 10 };
  const fakeReplace = { name: 'Im a fake product', quantity: 7 };

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('result of update product', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne({ _id, fakeProduct });
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('must have to be an object', () => products.update(_id, fakeProduct)
        .then((res) => expect(res).to.be.an('object')));

    it('object must have new props: id, name, quantity', () => products.update(_id, fakeReplace)
        .then((res) => expect(res.modifiedCount).to.equal(1)));
  });
});

describe('Test url remove "products"', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const fakeProduct = {_id, name: 'Im a fake product', quantity: 10 };

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('result of remove', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne(fakeProduct);
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('product must have to result null', () => products.remove(_id)
        .then(() => products.getById(_id)
        .then((res) => expect(res).to.be.null)));
  });
});

describe('Test url create "sales"', () => {
  let connect;
  const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('result of create', () => {
    it('must have to be an array', () => sales.create(itensSold)
        .then(({ itensSold }) => expect(itensSold).to.be.an('array')));

    it('array must have props: id, name, quantity', () => sales.create(itensSold)
        .then(({ itensSold: [item] }) => expect(item).to.include.all.keys('productId', 'quantity')));
  });
});

describe('Test url getAll "sales"', () => {
  let connect;
  const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('no data on DB', () => {
    it('returns an array', () => sales.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array must have to be empty', () => sales.getAll()
      .then((res) => expect(res).to.be.empty));
  });

  describe('db with data', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ itensSold });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('result must have to be an array', () => sales.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array is not empty', () => sales.getAll()
      .then((res) => expect(res).to.not.be.empty));

    it('array must have object', () => sales.getAll()
      .then(([item]) => expect(item).to.be.an('object')));

    it('object must have props: id, name, quantity', () => sales.getAll()
      .then(([item]) => expect(item).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Test url getById "sales', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('no data on DB', () => {
    it('returns null', () => sales.getById()
      .then((res) => expect(res).to.be.null));
  });

  describe('db with data', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('must have to be an object', () => sales.getById(_id)
      .then((res) => expect(res).to.be.an('object')));

    it('object must have props: id, name, quantity', () => sales.getById(_id)
      .then((res) => expect(res).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Test url update "sales"', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
  const newItens = [{ productId: '610007e7604ebb2c6bf20454', quantity: 1 }];

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('result of update', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('must have to be an object', () => sales.update(_id, itensSold)
        .then((res) => expect(res).to.be.an('object')));

    it('object must have new props: id, name, quantity', () => sales.update(_id, newItens)
        .then((res) => expect(res.modifiedCount).to.equal(1)));
  });
});

describe('Test url remove "sales"', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];

  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('result of remove', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('result must have to be null', () => sales.remove(_id)
        .then(() => products.getById(_id)
        .then((res) => expect(res).to.be.null)));
  });
});
